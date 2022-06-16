import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import PasswordField from '../../components/PasswordField'
import DateField from '../../components/DateField'
import {RegistrationFormKeys, PasswordFieldKeys} from '../../types/auth.types'
import {RegistrationFormState, RegistrationUiState} from './Registration'
import Divider from '@mui/material/Divider'
import {useNavigate} from 'react-router-dom'

interface Props {
  values: RegistrationFormState
  state: RegistrationUiState
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  handleCancel: (e: React.FormEvent<HTMLButtonElement>) => void
  handleChange: (
    prop: RegistrationFormKeys,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void
  handleClickShowPassword: (
    name: PasswordFieldKeys,
  ) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  handleDateChange: (date: Date | null) => void
  handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLButtonElement>) => void
  isLoadingButton: boolean
  disabledButton: boolean
}

export default function RegistrationForm(props: Props) {
  const {
    handleChange,
    values,
    handleBlur,
    state,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleCancel,
    handleDateChange,
    handleSubmit,
    isLoadingButton,
    disabledButton,
  } = props
  const {
    username,
    firstName,
    lastName,
    birthday,
    phoneNumber,
    email,
    password,
    confirmPassword,
  } = values
  const {showPassword, showConfirmPassword} = state
  const navigate = useNavigate()

  return (
    <Box sx={{flexGrow: 1, width: '35%', margin: '0 auto'}}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h3" align="center">
            Registration
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            id="username"
            label="Username"
            name="username"
            variant="outlined"
            onChange={handleChange('username')}
            required
            fullWidth
            error={username.error}
            helperText={username.error && username.errorMessage}
            onBlur={handleBlur}
            inputProps={{'aria-label': 'username'}}
          />
        </Grid>
        <Grid item>
          <TextField
            id="firstName"
            label="Firstname"
            name="firstName"
            variant="outlined"
            onChange={handleChange('firstName')}
            required
            fullWidth
            error={firstName.error}
            helperText={firstName.error && firstName.errorMessage}
            onBlur={handleBlur}
            inputProps={{'aria-label': 'firstName'}}
          />
        </Grid>
        <Grid item>
          <TextField
            id="lastName"
            label="Lastname"
            name="lastName"
            variant="outlined"
            onChange={handleChange('lastName')}
            required
            fullWidth
            error={lastName.error}
            helperText={lastName.error && lastName.errorMessage}
            onBlur={handleBlur}
            inputProps={{'aria-label': 'lastName'}}
          />
        </Grid>
        <Grid item>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            name="email"
            onChange={handleChange('email')}
            required
            fullWidth
            error={email.error}
            helperText={email.error && email.errorMessage}
            onBlur={handleBlur}
            inputProps={{'aria-label': 'email'}}
          />
        </Grid>
        <Grid item>
          <PasswordField
            values={{
              data: password.value as string,
              showPassword: showPassword,
            }}
            label="Password"
            name="password"
            handleChange={handleChange('password')}
            handleClickShowPassword={handleClickShowPassword('showPassword')}
            handleMouseDownPassword={handleMouseDownPassword}
            fullWidth={true}
            error={password.error}
            helperText={password.errorMessage}
            handleBlur={handleBlur}
          />
        </Grid>
        <Grid item>
          <PasswordField
            name="confirmPassword"
            values={{
              data: confirmPassword.value as string,
              showPassword: showConfirmPassword,
            }}
            label="Confirm password"
            handleChange={handleChange('confirmPassword')}
            handleClickShowPassword={handleClickShowPassword(
              'showConfirmPassword',
            )}
            handleMouseDownPassword={handleMouseDownPassword}
            fullWidth={true}
            error={confirmPassword.error}
            helperText={confirmPassword.errorMessage}
            handleBlur={handleBlur}
          />
        </Grid>
        <Grid item>
          <DateField
            label="Birthday"
            value={birthday.value as Date}
            fullWidth={true}
            handleChange={handleDateChange}
            maxDate={new Date('31/12/2004')}
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
            error={phoneNumber.error}
            helperText={phoneNumber.errorMessage}
            onBlur={handleBlur}
            inputProps={{'aria-label': 'phoneNumber'}}
          />
        </Grid>

        <Grid item>
          <LoadingButton
            variant="contained"
            onClick={handleSubmit}
            fullWidth
            disabled={disabledButton}
            loading={isLoadingButton}
            type="submit"
          >
            Send
          </LoadingButton>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleCancel} fullWidth>
            Cancel
          </Button>
        </Grid>
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
            ALREADY HAVE AN ACCOUNT?{' '}
          </Divider>
          <Button
            variant="outlined"
            onClick={() => navigate('/login')}
            fullWidth
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
