import React, {useState} from 'react'
import FormDialog from '../../components/FormDialog'
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks'
import RatingItem from './RatingItem'
import {useEditReviewMutation} from '../../app/api'
import {User} from '../../types/auth.types'
import {selectUserReview, editReview} from './review.slice'
import {selectOpenDialog, updateOpenDialog} from '../ui/ui.slice'

interface Props {
  user: User
  productId: number
}

export default function UpdateReviewForm(props: Props) {
  const {user, productId} = props
  const [updateReview] = useEditReviewMutation()
  const {review, openDialog} = useAppSelector(state => ({
    review: selectUserReview(state, productId, user.username),
    openDialog: selectOpenDialog(state),
  }))
  const dispatch = useAppDispatch()
  const [state, setState] = useState({
    message: review?.message as string,
    ratingValue: review?.score as number,
  })

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({...state, [e.target.name]: e.target.value})
  }

  const handleRatingChange = (
    e: React.SyntheticEvent,
    value: number | null,
  ) => {
    if (typeof value === 'number' && value >= 0) {
      setState({...state, ratingValue: value})
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (state.ratingValue || state.message) {
      const review = await updateReview({
        userId: user.id,
        productId: productId,
        message: state.message,
        score: state.ratingValue,
      }).unwrap()
      dispatch(editReview(review))
      dispatch(updateOpenDialog(false))
    }
  }

  const handleClose = () => dispatch(updateOpenDialog(false))

  return (
    <FormDialog
      open={openDialog}
      title="Update Review"
      handleSubmit={handleSubmit}
      handleClose={handleClose}
    >
      <RatingItem
        username={user.username}
        message={state.message}
        handleMessageChange={handleMessageChange}
        handleRatingChange={handleRatingChange}
        ratingValue={state.ratingValue}
        readOnly={false}
        messageDisabled={false}
      />
    </FormDialog>
  )
}
