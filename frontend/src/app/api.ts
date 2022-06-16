import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {UserResponse, LoginRequest, RegisterRequest} from '../types/auth.types'
import {SearchRequest, SearchResponse} from '../types/product.types'
import {
  DeleteResponse,
  Review,
  ReviewParams,
  ReviewResponse,
  ReviewUpdate,
} from '../types/review.types'
import {buildQueryString} from '../utils'
import {RootState} from './store'

export const api = createApi({
  reducerPath: 'Api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers, {getState}) => {
      const token =
        (getState() as RootState).auth.token ||
        window.localStorage.getItem('token')
      if (token) {
        headers.set('x-access-token', `${token}`)
      }
      return headers
    },
  }),
  endpoints: builder => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: credentials => ({
        url: 'signin',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<UserResponse, RegisterRequest>({
      query: credentials => ({
        url: 'signup',
        method: 'POST',
        body: credentials,
      }),
    }),
    searchProducts: builder.query<SearchResponse, SearchRequest>({
      query: searchParams => {
        const queryParams = buildQueryString(searchParams)
        return {url: `products/search?${queryParams}`, method: 'GET'}
      },
    }),
    getReviews: builder.query<ReviewResponse[], ReviewParams>({
      query: ({productId}) => {
        return {url: `reviews/${productId}`, method: 'GET'}
      },
    }),
    addReview: builder.mutation<ReviewResponse, Review>({
      query: review => ({
        url: 'reviews/add',
        method: 'POST',
        body: review,
      }),
    }),
    editReview: builder.mutation<ReviewResponse, ReviewUpdate>({
      query: review => ({
        url: `reviews/update/${review.productId}/user/${review.userId}`,
        method: 'PATCH',
        body: {
          score: review.score,
          message: review.message,
        },
      }),
    }),
    deleteUser: builder.mutation<DeleteResponse, number>({
      query: userId => ({
        url: `users/${userId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useSearchProductsQuery,
  useGetReviewsQuery,
  useAddReviewMutation,
  useEditReviewMutation,
  useDeleteUserMutation,
} = api
