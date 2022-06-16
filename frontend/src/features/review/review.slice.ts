import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import {ProductReviews, ReviewResponse} from '../../types/review.types'

interface InitialState {
  reviewTree: ProductReviews
}
const initialState: InitialState = {
  reviewTree: {} as ProductReviews,
}

const reviewSlice = createSlice({
  name: 'Review',
  initialState,
  reducers: {
    setReview: (state, {payload: review}: PayloadAction<ReviewResponse>) => {
      const productReviews = state.reviewTree[review.productId] ?? []
      productReviews.push({...review})
      state.reviewTree[review.productId] = productReviews
    },
    setAllReviews: (state, {payload}: PayloadAction<ProductReviews>) => {
      state.reviewTree = payload
    },
    editReview: (state, {payload: review}: PayloadAction<ReviewResponse>) => {
      const productReviews = state.reviewTree[review.productId]
      if (productReviews && productReviews.length) {
        const reviewIndex = productReviews.findIndex(r => r.id === review.id)
        if (reviewIndex >= 0) {
          productReviews[reviewIndex] = review
          state.reviewTree[review.productId] = productReviews
        }
      }
    },
  },
})

export const {setReview, editReview, setAllReviews} = reviewSlice.actions

export default reviewSlice.reducer

const reviewTreeSelector = (state: RootState) => state.review.reviewTree

export const selectAllReviews = createSelector(
  reviewTreeSelector,
  (state: RootState, productId: number) => productId,
  (
    reviewTree: ProductReviews,
    productId: number,
  ): ReviewResponse[] | undefined => {
    return reviewTree[productId]
  },
)
export const selectUserReview = createSelector(
  reviewTreeSelector,
  (state: RootState, productId: number, username: string) => productId,
  (state: RootState, productId: number, username: string) => username,
  (reviews: ProductReviews, productId: number, username: string) => {
    const productReviews = reviews[productId]
    if (productReviews && productReviews.length) {
      const userReview = productReviews.find(r => r.user === username)
      return userReview
    }
  },
)
