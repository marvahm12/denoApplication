import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import PersonIcon from '@mui/icons-material/Person'
import {Stack, TextField} from '@mui/material'
import {formatDate} from '../../utils/index'

interface Props {
  username: string
  createdAt?: string
  message: string
  handleMessageChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleRatingChange?: (e: React.SyntheticEvent, value: number | null) => void
  ratingValue: number
  readOnly: boolean
  messageDisabled: boolean
}
export default function RatingItem(props: Props) {
  const {
    username,
    createdAt,
    message,
    ratingValue,
    readOnly,
    handleRatingChange,
    messageDisabled,
    handleMessageChange,
  } = props

  return (
    <div style={{display: 'flex', flexDirection: 'column', marginLeft: 10}}>
      <Stack direction="row" sx={{margin: 1}}>
        <Avatar aria-label={`avatar-${username}`}>
          {' '}
          <PersonIcon />{' '}
        </Avatar>
        <Typography variant="subtitle1" sx={{marginTop: 0.5, marginLeft: 1}}>
          {username}
        </Typography>
      </Stack>
      <Rating
        name="rating"
        value={ratingValue}
        precision={1}
        readOnly={readOnly}
        onChange={handleRatingChange}
        sx={{marginBottom: 2}}
      />
      {createdAt ? (
        <Typography variant="subtitle1" gutterBottom>
          added on {formatDate(createdAt)}
        </Typography>
      ) : null}

      <TextField
        name="message"
        value={message}
        multiline
        maxRows={4}
        disabled={messageDisabled}
        variant={createdAt ? 'standard' : 'outlined'}
        sx={{marginBottom: 5}}
        onChange={handleMessageChange}
        inputProps={{
          'aria-label': 'review-message',
        }}
      />
    </div>
  )
}
