import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import GoogleIcon from '@mui/icons-material/Google'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import PasswordField from '../../components/PasswordField'
import {useLoginMutation} from '../../app/api'
import {useAppDispatch} from '../../hooks/storeHooks'
import {setCredentials} from './authentication.slice'
import CustomizedSnackBar from '../../components/CustomizedSnackBar'

interface LoginFormState {
  password: string
  showPassword: boolean
  username: string
  loading: boolean
  open: boolean
}

export default function LoginForm() {
  const [login, {isLoading, error}] = useLoginMutation()
  const navigate = useNavigate()
  const [values, setValues] = useState<LoginFormState>({
    password: '',
    showPassword: false,
    username: '',
    loading: isLoading,
    open: false,
  })
  const dispatch = useAppDispatch()

  const handleChange =
    (prop: keyof LoginFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({...values, [prop]: event.target.value})
    }
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

  const handleSnackBarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setValues({...values, open: false})
  }

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const {username, password} = values
      if (username && password) {
        const user = await login({username, password}).unwrap()
        dispatch(setCredentials(user))
        navigate('/')
      }
    } catch (e) {
      setValues({...values, loading: false, open: true})
    }
  }

  const handleGoogleButton = async (e: React.FormEvent<any>) => {
    e.preventDefault()
    const response = await fetch(process.env.REACT_APP_AUTH_URL as string)
    const data = await response.json()
    if (data) {
      window.open(data, '_self')
    }
  }

  const handleRegisterClick = () => {
    navigate('/register')
  }
  return (
    <>
      {' '}
      {error &&
      (('originalStatus' in error &&
        /^4\d{2}$/.test(`${error.originalStatus}`)) ||
        ('status' in error && /^4\d{2}$/.test(`${error.status}`))) ? (
        <CustomizedSnackBar
          open={values.open}
          message={error.data as string}
          severity="error"
          handleClose={handleSnackBarClose}
        />
      ) : (
        <CustomizedSnackBar
          open={values.open}
          message="Oops an error occured"
        />
      )}
      <Box sx={{flexGrow: 1, width: '35%', margin: '0 auto'}}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h3" align="center">
              Welcome back
            </Typography>
            <Typography variant="h6" align="center" color="primary">
              Log in to your account
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              name="username"
              label="Username"
              variant="outlined"
              onChange={handleChange('username')}
              required
              fullWidth
              inputProps={{'aria-label': 'username'}}
            />
          </Grid>
          <Grid item>
            <PasswordField
              name="password"
              values={{
                data: values.password,
                showPassword: values.showPassword,
              }}
              label="Password"
              handleChange={handleChange('password')}
              handleClickShowPassword={handleClickShowPassword}
              handleMouseDownPassword={handleMouseDownPassword}
              fullWidth={true}
            />
          </Grid>
          <Grid item>
            <LoadingButton
              variant="contained"
              onClick={handleSubmit}
              fullWidth
              loading={values.loading}
            >
              Login
            </LoadingButton>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleButton}
              fullWidth
            >
              Sign in with Google
            </Button>
            <Grid item>
              <Divider
                variant="middle"
                sx={{
                  margin: '50px 0px',
                  '&.MuiDivider-root': {
                    borderWidth: '1px',
                  },
                }}
                color="secondary"
              >
                {' '}
                OR LOG IN WITH{' '}
              </Divider>
              <Button
                variant="outlined"
                onClick={handleRegisterClick}
                fullWidth
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
