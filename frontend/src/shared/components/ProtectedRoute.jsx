import { Navigate, useLocation } from 'react-router'
import useAuth from '../../features/auth/hooks/useAuth.js'
import LoadingSpinner from './LoadingSpinner.jsx'

const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  const { isAuthenticated, isAuthLoading } = useAuth()

  if (isAuthLoading) {
    return <LoadingSpinner message="Checking your session..." />
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    )
  }

  return children
}

export default ProtectedRoute
