import {useEffect} from 'react'
import {useGetReviewsQuery} from '../app/api'
import {setAllReviews} from '../features/review/review.slice'
import {useAppDispatch} from './storeHooks'

const useReviews = (productId: number) => {
  const {data, isLoading, isFetching} = useGetReviewsQuery({productId})
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isFetching && data && data.length) {
      dispatch(setAllReviews({[productId]: data}))
    }
  }, [isFetching, data, dispatch, productId])
  return {isLoading}
}

export default useReviews
