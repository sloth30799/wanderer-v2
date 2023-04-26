import { createSlice } from "@reduxjs/toolkit"
import { UserType } from "../../../types"
import { authApiSlice } from "../../../api/authApiSlice"
interface UserState {
  user: UserType | null
  loading: boolean
}

const initialState: UserState = {
  user: null,
  loading: true,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user } = action.payload
      state.user = user
      state.loading = false
    },
    logOutUser: (state, _) => {
      state.user = null
      state.loading = true
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApiSlice.endpoints.fetchUser.matchFulfilled,
      (state, action) => {
        state.user = action.payload
        state.loading = false
      }
    )
  },
})

export const { setUser, logOutUser } = authSlice.actions

export default authSlice.reducer
