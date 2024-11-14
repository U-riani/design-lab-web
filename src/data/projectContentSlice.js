import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectContentApiSlice = createApi({
  reducerPath: "projectsContentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Projects"],
  endpoints: (builder) => ({
    createProjectsContentTitle: builder.mutation({
      query: ({ title, id }) => ({
        url: `projects/content/projectContentTitle/${id}`,
        method: "POST",
        body: { title, id },
      }),
      invalidatesTags: ["Projects"],
    }),
    updateProjectsContentTitle: builder.mutation({
      query: ({ title, id, index }) => ({
        url: `projects/content/projectContentTitle/${id}`,
        method: "PATCH",
        body: { title, id, index },
      }),
      invalidatesTags: ["Projects"],
    }),

    createProjectsContentVideo: builder.mutation({
      query: ({ video, id, index }) => ({
        url: `projects/content/projectContetnVideo/${id}`,
        method: "POST",
        body: { video, id, index },
      }),
      invalidatesTags: ["Projects"],
    }),
    updateProjectsContentVideo: builder.mutation({
      query: ({ video, id, index }) => ({
        url: `projects/content/projectContetnVideo/${id}`,
        method: "PATCH",
        body: { video, id, index },
      }),
      invalidatesTags: ["Projects"],
    }),

    getAllProjects: builder.query({
      query: () => "projects",
      providesTags: ["Projects"],
    }),
    getSingleProjects: builder.query({
      query: (id) => `projects/${id}`,
      providesTags: (result, error, id) => [{ type: "Projets", id }],
    }),
    deleteProjects: builder.mutation({
      query: (id) => ({
        url: `projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Projects", id }],
    }),
    createProjectsHeroData: builder.mutation({
      query: ({ formData, projectId }) => ({
        url: `projects/heroData/${projectId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Projects"],
    }),
    deleteProjectsHerodata: builder.mutation({
      query: ({ id, index }) => ({
        url: `projects/heroData/${id}?index=${index}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Projects", id }],
    }),
    updateProjectsDescription: builder.mutation({
      query: ({ projectId, name, description, mainProject }) => {
        return {
          url: `projects/description/${projectId}`,
          method: "PATCH",
          body: { projectId, name, description, mainProject },
        };
      },
      invalidatesTags: (result, error, { projectId }) => [
        { type: "Projects", id: projectId },
      ],
    }),
    updateProjectsHeroData: builder.mutation({
      query: ({ heroText, projectId, image, url, index }) => {
        const formData = new FormData();
        formData.append("index", index);
        formData.append("url", url);
        // formData.append("urlLastPart", urlLastPart)
        formData.append("heroText[ge]", heroText.ge);
        formData.append("heroText[en]", heroText.en);
        console.log(url);
        if (image) formData.append("images", image);
        // if (image) formData.append(`heroes[${index}][imageFile]`, image);
        return {
          url: `projects/heroData/${projectId}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { projectId }) => [
        { type: "Projects", id: projectId },
      ],
    }),

    updateProjects: builder.mutation({
      query: ({
        projectId,
        name,
        description,
        heroText,
        heroes,
        mainProject,
      }) => {
        const formData = new FormData();

        // Append project data
        if (name) {
          formData.append("name[ge]", name.ge);
          formData.append("name[en]", name.en);
        }

        if (description) {
          formData.append("description[ge]", description.ge);
          formData.append("description[en]", description.en);
        }

        if (heroText) {
          formData.append("heroText[ge]", heroText.ge);
          formData.append("heroText[en]", heroText.en);
        }

        // Append main project image (if provided)
        if (mainProject && mainProject instanceof File) {
          formData.append("mainProject", mainProject);
        }

        // Handle heroes and their images
        heroes.forEach((hero, index) => {
          formData.append(`heroes[${index}].heroText[ge]`, hero.heroText.ge);
          formData.append(`heroes[${index}].heroText[en]`, hero.heroText.en);

          // Upload new images or retain old images
          if (hero.imageFile) {
            formData.append(`images`, hero.imageFile); // New image
          } else if (hero.oldImage) {
            formData.append(`images`, hero.oldImage); // Keep old image if no new image
          }
        });

        return {
          url: `projects/${projectId}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { projectId }) => [
        { type: "Projects", id: projectId },
      ],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useGetSingleProjectsQuery,
  useCreateProjectsContentTitleMutation,
  useUpdateProjectsContentTitleMutation,
  useCreateProjectsContentVideoMutation,
  useUpdateProjectsContentVideoMutation,
  useDeleteProjectsMutation,
  useDeleteProjectsHerodataMutation,
  useCreateProjectsHeroDataMutation,
  useUpdateProjectsDescriptionMutation,
  useUpdateProjectsHeroDataMutation,
} = projectContentApiSlice;
