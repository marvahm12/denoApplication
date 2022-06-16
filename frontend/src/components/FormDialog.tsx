import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

interface Props {
  open: boolean
  title: string
  handleSubmit: (e: React.FormEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  handleClose: (e: React.FormEvent<HTMLButtonElement>) => void
  disabledSubmitButton?: boolean
}

export default function FormDialog(props: Props) {
  const {
    open,
    handleSubmit,
    title,
    handleClose,
    children,
    disabledSubmitButton,
  } = props

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={disabledSubmitButton}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}
