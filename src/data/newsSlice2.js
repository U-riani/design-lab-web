// src/features/api/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create the api slice
export const apiNewsSlice = createApi({
  reducerPath: "newsApi", // Default reducer path in the store
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }), // API base URL
  tagTypes: ["News"], // Tags to manage cache invalidation
  endpoints: (builder) => ({
    // Fetch all news
    getAllNews: builder.query({
      query: () => "news",
      transformResponse: (response) => response.reverse(), // Reverse the array if needed
      providesTags: (result) =>
        result ? result.map(({ _id }) => ({ type: "News", id: _id })) : [],
    }),

    // Fetch a single news item by ID
    getSingleNews: builder.query({
      query: (id) => `news/${id}`,
      providesTags: (result, error, id) => [{ type: "News", id }],
    }),

    // Fetch the last 5 news items
    getLast5News: builder.query({
      query: () => `last5News`,
    }),

    // Delete a news item
    deleteNews: builder.mutation({
      query: (id) => ({
        url: `news/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "News", id }],
    }),

    // Create a new news item with FormData for image uploads
    createNews: builder.mutation({
      query: (formData) => ({
        url: "news",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "News" }],
    }),

    // Update an existing news item with FormData for image uploads
    updateNews: builder.mutation({
      query: ({ id, title, text, image }) => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("text", text);
        if (image) {
          formData.append("image", image); // Attach image only if provided
        }
        return {
          url: `news/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "News", id }],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetAllNewsQuery,
  useGetSingleNewsQuery,
  useCreateNewsMutation,
  useGetLast5NewsQuery,
  useDeleteNewsMutation,
  useUpdateNewsMutation,
} = apiNewsSlice;
