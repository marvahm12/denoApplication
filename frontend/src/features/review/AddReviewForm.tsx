import React, {useState} from 'react'
import FormDialog from '../../components/FormDialog'
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks'
import RatingItem from './RatingItem'
import {useAddReviewMutation} from '../../app/api'
import {User} from '../../types/auth.types'
import {setReview} from './review.slice'
import {updateOpenDialog, selectOpenDialog} from '../ui/ui.slice'

interface Props {
  user: User
  productId: number
}

export default function AddReviewForm(props: Props) {
  const {user, productId} = props
  const [addReview] = useAddReviewMutation()
  const dispatch = useAppDispatch()
  const [state, setState] = useState({
    message: '',
    ratingValue: 1,
  })
  const openDialog = useAppSelector(state => selectOpenDialog(state))

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
      const review = await addReview({
        userId: user.id,
        productId: productId,
        message: state.message,
        score: state.ratingValue,
      }).unwrap()
      dispatch(setReview(review))
      dispatch(updateOpenDialog(false))
    }
  }

  const handleClose = () => dispatch(updateOpenDialog(false))

  return (
    <FormDialog
      open={openDialog}
      title="Add Review"
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
