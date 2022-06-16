import {useState} from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {useNavigate} from 'react-router-dom'
import {AddressFormKeys} from '../../../types/product.types'
import {useAppDispatch} from '../../../hooks/storeHooks'
import {addShippingAddress} from '../product.slice'
import {checkValidPattern} from 'utils'

interface AddressFormValue {
  value: string
  error?: boolean
  errorMessage?: string
}

export type AddressFormState = {
  [key in AddressFormKeys]: AddressFormValue
}

export interface AddressUiState {
  open: boolean
  disabledButton: boolean
}

const initialState: AddressFormState = {
  name: {
    value: '',
    error: false,
    errorMessage: '',
  },
  phoneNumber: {
    value: '',
    error: false,
    errorMessage: '',
  },
  address: {
    value: '',
    error: false,
    errorMessage: '',
  },
  zipCode: {
    value: '',
    error: false,
    errorMessage: '',
  },
  city: {
    value: '',
    error: false,
    errorMessage: '',
  },
  country: {
    value: '',
    error: false,
    errorMessage: '',
  },
}

export default function Address() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [values, setValues] = useState<AddressFormState>(initialState)
  const isDisabledButton = Object.keys(values).every(
    key =>
      values[key as AddressFormKeys].value &&
      !values[key as AddressFormKeys].error,
  )
  const handleChange =
    (prop: AddressFormKeys) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target
      // const isAllFieldsFilled = Object.keys(values).every(
      //   key =>
      //     values[key as AddressFormKeys].value &&
      //     !values[key as AddressFormKeys].error,
      // )

      if (prop === 'phoneNumber' && checkValidPattern(prop, value)) {
        setValues({
          ...values,
          [prop]: {
            ...values[prop],
            value,
            error: true,
            errorMessage: checkValidPattern(prop, value),
          },
        })
        return
      }
      setValues({
        ...values,
        [prop]: {...values[prop], value, error: false, errorMessage: ''},
      })
    }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setValues({
        ...values,
        [e.target.name]: {
          ...values[e.target.name as AddressFormKeys],
          error: true,
          errorMessage: 'required*',
        },
      })
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    const addressValues = Object.keys(values).reduce(
      (acc: Record<AddressFormKeys, string>, key) => {
        acc[key as AddressFormKeys] = values[key as AddressFormKeys].value
        return acc
      },
      {} as Record<AddressFormKeys, string>,
    )
    dispatch(addShippingAddress(addressValues))
    navigate('/payment')
  }
  return (
    <Box sx={{flexGrow: 1, width: '35%', margin: '0 auto'}}>
      <Typography
        component="div"
        variant="h3"
        sx={{marginTop: 5, marginBottom: 5}}
        align="center"
      >
        Add your address
      </Typography>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            id="name"
            label="Name"
            name="name"
            variant="outlined"
            onChange={handleChange('name')}
            required
            fullWidth
            error={values.name.error}
            helperText={values.name.error && values.name.errorMessage}
            onBlur={handleBlur}
            inputProps={{'aria-label': 'name'}}
          />
        </Grid>
        <Grid item>
          <TextField
            id="phoneNumber"
            label="Phone number"
            name="phoneNumber"
            variant="outlined"
            onChange={handleChange('phoneNumber')}
            required
            fullWidth
            error={values.phoneNumber.error}
            helperText={
              values.phoneNumber.error && values.phoneNumber.errorMessage
            }
            onBlur={handleBlur}
            inputProps={{'aria-label': 'phoneNumber'}}
          />
        </Grid>
        <Grid item>
          <TextField
            id="address"
            label="Address"
            name="address"
            variant="outlined"
            onChange={handleChange('address')}
            required
            fullWidth
            error={values.address.error}
            helperText={values.address.errorMessage}
            onBlur={handleBlur}
            inputProps={{'aria-label': 'address'}}
          />
        </Grid>
        <Grid item>
          <TextField
            id="zipCode"
            label="Zip Code"
            name="zipCode"
            variant="outlined"
            onChange={handleChange('zipCode')}
            required
            fullWidth
            error={values.zipCode.error}
            helperText={values.zipCode.errorMessage}
            onBlur={handleBlur}
            inputProps={{'aria-label': 'zipCode'}}
          />
        </Grid>

        <Grid item>
          <TextField
            id="city"
            label="City"
            name="city"
            variant="outlined"
            onChange={handleChange('city')}
            required
            fullWidth
            error={values.city.error}
            helperText={values.city.errorMessage}
            onBlur={handleBlur}
            inputProps={{'aria-label': 'city'}}
          />
        </Grid>
        <Grid item>
          <TextField
            id="country"
            label="Country"
            name="country"
            variant="outlined"
            onChange={handleChange('country')}
            required
            fullWidth
            error={values.country.error}
            helperText={values.country.errorMessage}
            onBlur={handleBlur}
            inputProps={{'aria-label': 'country'}}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={handleSubmit}
            color="secondary"
            fullWidth
            disabled={!isDisabledButton}
          >
            Confirm address
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
