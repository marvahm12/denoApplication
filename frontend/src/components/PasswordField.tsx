import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

interface PasswordState {
  data: string
  showPassword: boolean
}

interface Props {
  label: string
  values: PasswordState
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleClickShowPassword: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void
  handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  fullWidth?: boolean
  error?: boolean
  helperText?: string
  name: string
}

export default function PasswordField(props: Props) {
  const {
    label,
    values,
    handleChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    fullWidth,
    error,
    helperText,
    handleBlur,
    name,
  } = props
  return (
    <FormControl variant="outlined" fullWidth={fullWidth}>
      <InputLabel htmlFor="password">{label}</InputLabel>
      <OutlinedInput
        name={name}
        type={values.showPassword ? 'text' : 'password'}
        value={values.data}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        error={error}
        inputProps={{'aria-label': name}}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      {!!error && (
        <FormHelperText
          error
          id="password-error"
          data-testid={`${name}-helperText`}
        >
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}
