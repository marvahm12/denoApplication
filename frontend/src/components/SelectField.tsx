import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, {SelectChangeEvent} from '@mui/material/Select'

type SelectValues = {
  value: string
  label: string
}

interface Props {
  label: string
  value: string
  handleChange: (e: SelectChangeEvent) => void
  selectValues: SelectValues[]
  ariaLabel: string
}

export default function SelectField(props: Props) {
  const {label, value, selectValues, handleChange, ariaLabel} = props

  return (
    <FormControl sx={{m: 1, minWidth: 120}} size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={handleChange}
        inputProps={{'aria-label': ariaLabel}}
      >
        {selectValues.map(elem => (
          <MenuItem value={elem.value} key={elem.label}>
            {elem.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
