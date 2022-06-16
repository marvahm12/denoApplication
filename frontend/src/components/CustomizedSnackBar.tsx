/* eslint-disable no-unreachable */
import * as React from 'react'
import Alert, {AlertColor} from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

interface Props {
  open: boolean
  handleClose?: () => void
  message: string
  hideDuration?: number
  severity?: AlertColor
}

export default function CustomizedSnackBar(props: Props) {
  const {open, handleClose, message, hideDuration, severity} = props

  return (
    <>
      {severity ? (
        <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
          open={open}
          onClose={handleClose}
          message={message}
          autoHideDuration={6000}
        >
          <Alert severity={severity} onClose={handleClose}>
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
          open={open}
          onClose={handleClose}
          message={message}
          autoHideDuration={hideDuration || 6000}
        />
      )}
    </>
  )
}
