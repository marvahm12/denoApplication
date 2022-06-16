import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import AddIcon from '@mui/icons-material/Add'
import RatingItem from './RatingItem'
import Button from '@mui/material/Button'
import AddReviewForm from './AddReviewForm'
import {useAuth} from '../../hooks/useAuth'
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks'
import useReviews from '../../hooks/reviewHooks'
import UpdateReviewForm from './UpdateReviewForm'
import {selectAllReviews, selectUserReview} from './review.slice'
import {RootState} from '../../app/store'
import {updateOpenDialog} from '../ui/ui.slice'
import {isEmpty} from 'utils'

interface Props {
  productId: number
}

export default function ReviewList(props: Props) {
  const {productId} = props
  const dispatch = useAppDispatch()
  const {user} = useAuth()

  const {isLoading} = useReviews(productId)
  const {reviews, userReview} = useAppSelector((state: RootState) => ({
    reviews: selectAllReviews(state, productId),
    userReview: selectUserReview(state, productId, user.username),
  }))
  const isUserReviewExist = !isEmpty(userReview)

  const handleClick = () => {
    dispatch(updateOpenDialog(true))
  }
  let content

  if (isLoading)
    content = (
      <Box sx={{pt: 0.5}}>
        <Skeleton />
        <Skeleton width="100%" />
      </Box>
    )
  if (reviews && reviews.length) {
    content = (
      <>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleClick}
        >
          {isUserReviewExist ? 'Update review' : 'Add review'}
        </Button>
        {isUserReviewExist && (
          <UpdateReviewForm user={user} productId={productId} />
        )}
        {!isUserReviewExist && (
          <AddReviewForm user={user} productId={productId} />
        )}

        {reviews.map(review => (
          <RatingItem
            key={`review-${review.user}`}
            username={review.user}
            message={review.message}
            ratingValue={review.score}
            readOnly={true}
            messageDisabled={true}
            createdAt={review.createdAt}
          />
        ))}
      </>
    )
  } else {
    content = (
      <>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleClick}
        >
          Add review
        </Button>

        <AddReviewForm user={user} productId={productId} />
      </>
    )
  }

  return <>{content}</>
}
