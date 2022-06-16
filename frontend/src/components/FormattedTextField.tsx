import {forwardRef} from 'react'
import FormControl from '@mui/material/FormControl'
import NumberFormat from 'react-number-format'
import TextField from '@mui/material/TextField'
import {FormHelperText, SxProps} from '@mui/material'

interface CustomProps {
  onChange: (event: {target: {name: string; value: string}}) => void
  name: string
  format: string
  mask: string
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  helperText: React.ReactNode
  error?: boolean
  required?: boolean
}

const NumberFormatCustom = forwardRef<NumberFormat<number>, CustomProps>(
  function NumberFormatCustom(props, ref) {
    const {
      onChange,
      mask,
      name,
      format,
      handleBlur,
      helperText,
      error,
      required,
      ...other
    } = props

    return (
      <NumberFormat
        {...other}
        name={name}
        getInputRef={ref}
        onValueChange={values => {
          onChange({
            target: {
              name: name,
              value: values.value,
            },
          })
        }}
        isNumericString
        displayType="input"
        format={format}
        mask={mask}
        onBlur={handleBlur}
      />
    )
  },
)

interface Props {
  format: string
  mask?: string
  value: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  label: string
  name: string
  fullWidth?: boolean
  required?: boolean
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  error?: boolean
  helperText?: React.ReactNode
  placeholder?: string
  sx?: SxProps
}

export default function FormattedTextField(props: Props) {
  const {
    handleChange,
    value,
    label,
    name,
    fullWidth,
    required,
    error,
    handleBlur,
    helperText,
    format,
    mask,
    placeholder,
    sx,
  } = props

  return (
    <FormControl fullWidth={fullWidth}>
      <TextField
        label={label}
        value={value}
        onChange={handleChange}
        name={name}
        InputProps={{
          inputComponent: NumberFormatCustom as any,
          inputProps: {
            name,
            format,
            mask,
            handleBlur,
            required,
            'aria-label': name,
          },
        }}
        fullWidth={fullWidth}
        variant="outlined"
        placeholder={placeholder}
        sx={sx}
      />
      {error ? (
        <FormHelperText error={error} required={required}>
          {helperText}
        </FormHelperText>
      ) : null}
    </FormControl>
  )
}
