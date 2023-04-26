import { UserType } from "../types"
import { apiSlice } from "./apiSlice"

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUser: builder.query<UserType, void>({
      query: () => "auth/getUser",
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "auth/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<any, void>({
      query: () => "auth/logout",
    }),
  }),
})

export const {
  useFetchUserQuery,
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
} = authApiSlice
