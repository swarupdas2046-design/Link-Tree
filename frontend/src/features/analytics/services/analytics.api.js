import apiClient from '../../../shared/api/apiClient'

export const getAnalytics = async (id) => {

  const response = await apiClient.get(

    `/links/${id}/analytics`

  )

  return response.data

}