import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomizedSnackBar from '../../components/CustomizedSnackBar'
import {useAppDispatch} from '../../hooks/storeHooks'
import {useRegisterMutation} from '../../app/api'
import {
  RegisterRequest,
  RegistrationFormKeys,
  PasswordFieldKeys,
} from '../../types/auth.types'
import {setCredentials} from './authentication.slice'
import RegistrationForm from './RegistrationForm'
import {checkValidPattern} from '../../utils/index'

interface RegistrationFormValue {
  value: string | Date
  error?: boolean
  errorMessage?: string
}

export type RegistrationFormState = {
  [key in RegistrationFormKeys]: RegistrationFormValue
}

export interface RegistrationUiState {
  open: boolean
  loading: boolean
  disabledButton: boolean
  showPassword: boolean
  showConfirmPassword: boolean
}

const initialState: RegistrationFormState = {
  firstName: {
    value: '',
    error: false,
    errorMessage: '',
  },
  lastName: {
    value: '',
    error: false,
    errorMessage: '',
  },
  confirmPassword: {
    value: '',
    error: false,
    errorMessage: '',
  },
  phoneNumber: {
    value: '',
    error: false,
    errorMessage: '',
  },
  password: {
    value: '',
    error: false,
    errorMessage: '',
  },
  username: {
    value: '',
    error: false,
    errorMessage: '',
  },
  email: {
    value: '',
    error: false,
    errorMessage: '',
  },
  birthday: {
    value: new Date('01/01/2004'),
    error: false,
    errorMessage: '',
  },
}

export default function Registration() {
  const navigate = useNavigate()
  const [register, {isLoading, error}] = useRegisterMutation()
  const [formValues, setFormValues] =
    React.useState<RegistrationFormState>(initialState)
  const [state, setState] = useState<RegistrationUiState>({
    showPassword: false,
    showConfirmPassword: false,
    disabledButton: true,
    loading: isLoading,
    open: false,
  })
  const dispatch = useAppDispatch()

  const handleChange =
    (prop: RegistrationFormKeys) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target

      if (prop === 'confirmPassword' && value !== formValues.password.value) {
        setFormValues({
          ...formValues,
          [prop]: {
            ...formValues[prop],
            value,
            error: true,
            errorMessage: 'Different passwords.',
          },
        })
        return
      }
      if (checkValidPattern(prop, value)) {
        setFormValues({
          ...formValues,
          [prop]: {
            ...formValues[prop],
            value,
            error: true,
            errorMessage: checkValidPattern(prop, value),
          },
        })
        return
      }
      setFormValues({
        ...formValues,
        [prop]: {...formValues[prop], value, error: false, errorMessage: ''},
      })
    }
  const handleClickShowPassword =
    (name: PasswordFieldKeys) =>
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setState({...state, [name]: !state[name]})
    }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const isErrorsExist = Object.keys(formValues).some(
        key => formValues[key as RegistrationFormKeys].error,
      )
      if (!isErrorsExist) {
        const userCredentials = Object.keys(formValues).reduce(
          (acc: RegisterRequest, key: string) => {
            if (key !== 'confirmPassword') {
              acc[key as RegistrationFormKeys] =
                formValues[key as RegistrationFormKeys].value
            }
            return acc
          },
          {} as RegisterRequest,
        )
        const registeredUser = await register(userCredentials).unwrap()
        dispatch(setCredentials(registeredUser))
        navigate('/')
      }
    } catch (e) {
      setState({...state, loading: false, open: true})
    }
  }
  const handleCancel = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setFormValues(initialState)
  }

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormValues({
        ...formValues,
        birthday: {...formValues.birthday, value: date},
      })
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setFormValues({
        ...formValues,
        [e.target.name]: {
          ...formValues[e.target.name as RegistrationFormKeys],
          error: true,
          errorMessage: 'required*',
        },
      })
    }
  }

  const handleSnackBarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setState({...state, open: false})
  }
  return (
    <>
      {error &&
      'originalStatus' in error &&
      /^4\d{2}$/.test(`${error.originalStatus}`) ? (
        <CustomizedSnackBar
          open={state.open}
          message={error.data}
          severity="error"
          handleClose={handleSnackBarClose}
        />
      ) : (
        <CustomizedSnackBar open={state.open} message="Oops an error occured" />
      )}
      <RegistrationForm
        state={state}
        values={formValues}
        handleBlur={handleBlur}
        handleCancel={handleCancel}
        handleChange={handleChange}
        handleClickShowPassword={handleClickShowPassword}
        handleDateChange={handleDateChange}
        handleMouseDownPassword={handleMouseDownPassword}
        handleSubmit={handleSubmit}
        isLoadingButton={isLoading}
        disabledButton={
          !Object.keys(formValues).every(
            k => formValues[k as RegistrationFormKeys].value,
          )
        }
      />
    </>
  )
}
