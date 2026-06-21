import apiClient from '../../../shared/api/apiClient'

export const getMyLinks = async () => {
  const response = await apiClient.get('/links/me')
  return response.data
}

export const createLink = async (payload) => {
  const response = await apiClient.post('/links', payload)
  return response.data
}

export const deleteLink = async (id) => {
  const response = await apiClient.delete(`/links/${id}`)
  return response.data
}