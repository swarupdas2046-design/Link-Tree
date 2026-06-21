import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://link-tree-backend-kc0r.onrender.com/api',
  withCredentials: true,
})

export default apiClient
