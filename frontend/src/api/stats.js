import apiClient from './client'

export const getStats = (params = {}) => {
  return apiClient.get('/products/stats', { params })
}
