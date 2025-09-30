import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../slices/authentication/authApi'
import authReducer from '../slices/authentication/authSlice'

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware),
})

export default store
