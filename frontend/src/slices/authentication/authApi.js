import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import PAGEPATH from '../../helpers/pagePath'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: PAGEPATH.BASE }),
  endpoints: builder => ({
    fetchAuth: builder.mutation({
      query: authvalues => ({
        url: 'login',
        method: 'POST',
        body: authvalues,
      }),
    }),
  }),
})

export const {
  useFetchAuthMutation,
} = authApi
