import * as React from 'react'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'

interface Props {
  value: Date | null
  handleChange: (value: Date | null) => void
  label: string
  fullWidth?: boolean
  maxDate?: Date
}

export default function DateField(props: Props) {
  const {value, handleChange, label, maxDate} = props
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        disableFuture
        label={label}
        openTo="year"
        views={['year', 'month', 'day']}
        value={value}
        onChange={handleChange}
        maxDate={maxDate}
        renderInput={params => <TextField {...params} fullWidth />}
      />
    </LocalizationProvider>
  )
}
