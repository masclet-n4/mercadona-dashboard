import apiClient from './client'

export const getProducts = (params = {}) => {
  return apiClient.get('/products', { params })
}

export const getProductById = (id) => {
  return apiClient.get(`/products/${id}`)
}
