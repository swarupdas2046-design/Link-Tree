import apiClient from '../../../shared/api/apiClient.js'

export const registerUser = async ({ username, email, password }) => {
  const response = await apiClient.post('/auth/register', {
    username,
    email,
    password,
  })

  return response.data
}

export const loginUser = async ({ identifier, password }) => {
  const response = await apiClient.post('/auth/login', {
    identifier,
    password,
  })

  return response.data
}

export const getCurrentUser = async () => {
  const response = await apiClient.get('/auth/me')

  return response.data
}

export const logoutUser = async () => {
  const response = await apiClient.post('/auth/logout')

  return response.data
}
