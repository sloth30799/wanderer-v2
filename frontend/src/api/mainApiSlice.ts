import { apiSlice } from "./apiSlice"

export const mainApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchProfile: builder.query<any, void>({
      query: () => "profile",
    }),
    fetchFeed: builder.query<any, void>({
      query: () => "feed",
    }),
  }),
})

export const { useFetchProfileQuery, useFetchFeedQuery } = mainApiSlice
