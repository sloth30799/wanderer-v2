import { apiSlice } from "./apiSlice"

const tempateApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllTemplates: builder.query<any, void>({
      query: () => "template/AllTemplates",
    }),
    addTemplate: builder.mutation<any, void>({
      query: () => ({
        url: "template/createGearTemplate",
        method: "POST",
      }),
    }),
    deleteTemplate: builder.mutation<any, string>({
      query: (id) => ({
        url: `template/deleteGearTemplate/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useAddTemplateMutation,
  useDeleteTemplateMutation,
  useFetchAllTemplatesQuery,
} = tempateApiSlice
