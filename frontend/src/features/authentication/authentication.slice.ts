import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {User, UserResponse} from '../../types/auth.types'
import {RootState} from '../../app/store'
import Cookies from 'js-cookie'

type AuthenticationState = UserResponse

const initialState: AuthenticationState = {
  user: {} as User,
  token: '',
}

const authenticationSlice = createSlice({
  name: 'Authentication',
  initialState,
  reducers: {
    setCredentials: (
      state,
      {payload: {user, token}}: PayloadAction<{user: User; token: string}>,
    ) => {
      state.user = user
      state.token = token
    },
    logOut: state => {
      state.user = {} as User
      state.token = ''
      window.localStorage.removeItem('token')
      if (Cookies.get('user')) {
        Cookies.remove('user')
      }
    },
  },
})

export const {setCredentials, logOut} = authenticationSlice.actions

export default authenticationSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
