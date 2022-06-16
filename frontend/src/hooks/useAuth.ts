import {useMemo} from 'react'
import {useAppSelector} from './storeHooks'
import {selectCurrentUser} from '../features/authentication/authentication.slice'
import Cookies from 'js-cookie'
import {User} from '../types/auth.types'

export const useAuth = () => {
  const user = useAppSelector(selectCurrentUser)

  const userCookie = Cookies.get('user')
  let parsedCookie = userCookie ? JSON.parse(userCookie) : null
  const value: User = parsedCookie ? parsedCookie.user : user
  if (parsedCookie && parsedCookie.token) {
    window.localStorage.setItem('token', parsedCookie.token)
  }

  return useMemo(() => ({user: value}), [value])
}
