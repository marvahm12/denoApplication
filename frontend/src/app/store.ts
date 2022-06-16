import {configureStore} from '@reduxjs/toolkit'
import authenticationReducer from '../features/authentication/authentication.slice'
import productReducer from '../features/product/product.slice'
import reviewReducer from '../features/review/review.slice'
import uiReducer from '../features/ui/ui.slice'
import {api} from './api'

export const appReducer = {
  [api.reducerPath]: api.reducer,
  auth: authenticationReducer,
  product: productReducer,
  review: reviewReducer,
  ui: uiReducer,
}
export const storeMiddleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware().concat(api.middleware)
export const store = configureStore({
  reducer: appReducer,
  middleware: storeMiddleware,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type ReducerType = typeof appReducer
