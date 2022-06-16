import {Navigate, Outlet} from 'react-router-dom'
import {useAuth} from '../hooks/useAuth'

export function PrivateRoute() {
  const {user} = useAuth()
  if (!Object.keys(user).length) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
