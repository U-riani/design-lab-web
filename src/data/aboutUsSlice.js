// src/features/api/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create the api slice
export const apiAboutUsSlice = createApi({
  reducerPath: "aboutUsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://design-union-backend.vercel.app/api/",
    prepareHeaders: (headers) => {
      // You can add headers here if needed
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["AboutUs"],
  endpoints: (builder) => ({
    getAboutUs: builder.query({
      query: () => "aboutUs",
      providesTags: (result) =>
        result ? result.map(({ _id }) => ({ type: "AboutUs", id: _id })) : [],
    }),

    createAboutUs: builder.mutation({
      query: (formData) => ({
        url: "aboutUs",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "AboutUs" }],
    }),

    updateAboutUs: builder.mutation({
      query: ({ id, enText, geText, imageFile }) => {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("text[en]", enText);
        formData.append("text[ge]", geText);

        if (imageFile) {
          formData.append("images", imageFile);
        }

        return {
          url: `aboutUs`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "AboutUs", id }],
    }),
  }),
});

export const {
  useGetAboutUsQuery,
  useCreateAboutUsMutation,
  useUpdateAboutUsMutation,
} = apiAboutUsSlice;