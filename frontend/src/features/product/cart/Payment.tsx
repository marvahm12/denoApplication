import {useState} from 'react'
import Box from '@mui/material/Box'
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {
  MainPaymentCardKeys,
  PaymentCardKeys,
  PaymentCardFormState,
} from '../../../types/product.types'
import {useAppDispatch} from '../../../hooks/storeHooks'
import {addPaymentCard, resetCart} from '../product.slice'
import FormattedTextField from '../../../components/FormattedTextField'
import {checkValidPattern} from '../../../utils/index'
import {useNavigate} from 'react-router-dom'

const initialState: PaymentCardFormState = {
  cardNumber: {
    value: '',
    error: false,
    errorMessage: '',
  },
  cardName: {
    value: '',
    error: false,
    errorMessage: '',
  },
  securityCode: {
    value: '',
    error: false,
    errorMessage: '',
  },
}

export default function Payment() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [values, setValues] = useState<PaymentCardFormState>(initialState)
  const [expirationDate, setExpirationDate] = useState<Date>(new Date())
  const isAllFieldsValid = Object.keys(values).every(
    key =>
      values[key as MainPaymentCardKeys].value &&
      !values[key as MainPaymentCardKeys].error,
  )

  const handleChange =
    (prop: MainPaymentCardKeys) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target
      if (checkValidPattern(prop, value)) {
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
          ...values[e.target.name as MainPaymentCardKeys],
          error: true,
          errorMessage: 'required*',
        },
      })
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // const isAllFieldsValid = Object.keys(values).every(
    //   key =>
    //     values[key as MainPaymentCardKeys].value &&
    //     !values[key as MainPaymentCardKeys].error,
    // )
    if (isAllFieldsValid) {
      const paymentCard = Object.keys(values).reduce(
        (acc: Record<PaymentCardKeys, string | number>, key) => {
          acc[key as PaymentCardKeys] = values[key as MainPaymentCardKeys].value
          return acc
        },
        {} as Record<PaymentCardKeys, string | number>,
      )
      paymentCard.expirationYear = expirationDate.getFullYear()
      paymentCard.expirationMonth = expirationDate.getMonth() + 1
      dispatch(addPaymentCard(paymentCard))
      dispatch(resetCart())
      navigate('/summary')
    }
  }

  const handleExpirationDate = (newValue: Date | null) => {
    if (!newValue) {
      setExpirationDate(new Date())
    } else {
      setExpirationDate(newValue)
    }
  }
  return (
    <>
      <Box sx={{flexGrow: 1, width: '35%', margin: '0 auto'}}>
        <Typography
          component="div"
          variant="h3"
          sx={{marginTop: 5, marginBottom: 5}}
          align="center"
        >
          Add your card
        </Typography>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              id="cardName"
              label="Card Name"
              name="cardName"
              variant="outlined"
              onChange={handleChange('cardName')}
              required
              fullWidth
              error={values.cardName.error}
              helperText={values.cardName.error && values.cardName.errorMessage}
              onBlur={handleBlur}
              inputProps={{'aria-label': 'cardName'}}
            />
          </Grid>
          <Grid item>
            <FormattedTextField
              label="Card number"
              name="cardNumber"
              handleChange={handleChange('cardNumber')}
              fullWidth
              error={values.cardNumber.error}
              helperText={values.cardNumber.errorMessage}
              handleBlur={handleBlur}
              value={values.cardNumber.value as string}
              format="#### #### #### ####"
              mask="_"
              required
              placeholder="1234 5678 9012 3456"
            />
          </Grid>
          <Grid item>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
              <FormattedTextField
                label="Security Code (CVV)"
                value={values.securityCode.value}
                name="securityCode"
                handleChange={handleChange('securityCode')}
                required
                error={values.securityCode.error}
                helperText={values.securityCode.errorMessage}
                handleBlur={handleBlur}
                format="###"
                mask="_"
                placeholder="123"
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={['year', 'month']}
                  label="Year and Month"
                  minDate={new Date()}
                  maxDate={new Date('2023-06-01')}
                  value={expirationDate}
                  onChange={handleExpirationDate}
                  renderInput={params => (
                    <TextField {...params} helperText={null} sx={{ml: 15}} />
                  )}
                />
              </LocalizationProvider>
            </Box>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={handleSubmit}
              color="secondary"
              fullWidth
              disabled={!isAllFieldsValid}
            >
              Confirm Card
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
