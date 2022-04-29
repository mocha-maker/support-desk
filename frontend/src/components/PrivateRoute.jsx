import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'

export const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus()

  if (checkingStatus) {
    return <Spinner />
  }

  // Route to original destination if logged in else go to login page
  return loggedIn ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute
