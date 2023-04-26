import { apiSlice } from "./apiSlice"

const blogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchBlog: builder.query({
      query: (blogId) => `post/${blogId}`,
    }),
    addBlog: builder.mutation({
      query: (formData) => ({
        url: "post/createPost",
        method: "POST",
        body: formData,
      }),
    }),
    likeBlog: builder.mutation({
      query: (id) => ({
        url: `post/likePost/${id}`,
        method: "PUT",
      }),
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `post/deletePost/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useAddBlogMutation,
  useDeleteBlogMutation,
  useFetchBlogQuery,
  useLikeBlogMutation,
} = blogApiSlice
