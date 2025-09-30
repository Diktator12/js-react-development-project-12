import { createSlice } from '@reduxjs/toolkit'
import { authApi } from './authApi'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: localStorage.getItem('username'),
    token: localStorage.getItem('token'),
  },
  reducers: {
    setCredentials: (state, action) => {
      state.username = action.payload.token
      state.token = action.payload.token
    },
    clearCredentials: (state) => {
      localStorage.removeItem('username')
      localStorage.removeItem('token')
      state.username = null
      state.token = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.fetchAuth.matchFulfilled,
        (state, { payload }) => {
          state.username = payload.username
          state.token = payload.token
          localStorage.setItem('username', payload.username)
          localStorage.setItem('token', payload.token)
        },
      )
  },
})

export const { setCredentials, clearCredentials } = authSlice.actions
export const currentTokenSelector = state => state.auth.token
export const currentUsernameSelector = state => state.auth.username
// export const authorizationError = state => state.auth.error
export default authSlice.reducer
