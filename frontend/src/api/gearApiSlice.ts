import { apiSlice } from "./apiSlice"

const gearApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchGear: builder.query({
      query: (gearId) => `gear/${gearId}`,
    }),
    updateGear: builder.mutation({
      query: ({ id, gear }) => ({
        url: `gear/updateGear/${id}`,
        method: "PUT",
        body: gear,
      }),
    }),
  }),
})

export const { useFetchGearQuery, useUpdateGearMutation } = gearApiSlice
