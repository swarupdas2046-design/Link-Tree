import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../features/auth/services/auth.api.js'
import AuthContext from './AuthContext.js'

let currentUserRequest

const restoreCurrentUser = () => {
  if (!currentUserRequest) {
    currentUserRequest = getCurrentUser()
  }

  return currentUserRequest
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  const [authError, setAuthError] = useState(null)

  useEffect(() => {
    let isActive = true

    const restoreUser = async () => {
      try {
        const data = await restoreCurrentUser()

        if (isActive) {
          setUser(data.user)
        }
      } catch (error) {
        if (!isActive) {
          return
        }

        setUser(null)

        if (error.response?.status !== 401) {
          setAuthError(
            error.response?.data?.message || 'Failed to restore user session',
          )
        }
      } finally {
        if (isActive) {
          setIsAuthLoading(false)
        }
      }
    }

    restoreUser()

    return () => {
      isActive = false
    }
  }, [])

  const register = useCallback(async (credentials) => {
    setAuthError(null)

    const data = await registerUser(credentials)
    setUser(data.user)

    return data
  }, [])

  const login = useCallback(async (credentials) => {
    setAuthError(null)

    const data = await loginUser(credentials)
    setUser(data.user)

    return data
  }, [])

  const logout = useCallback(async () => {
    setAuthError(null)

    try {
      return await logoutUser()
    } finally {
      setUser(null)
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAuthLoading,
      authError,
      register,
      login,
      logout,
      setUser,
    }),
    [user, isAuthLoading, authError, register, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
