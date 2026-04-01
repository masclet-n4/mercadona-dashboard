import apiClient from './client'

export const getProducts = (params = {}) => {
  return apiClient.get('/products', { params })
}
