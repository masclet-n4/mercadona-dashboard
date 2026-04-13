
import apiClient from './client.js'

export const getHistoric = ({ id, start = '', end = '' }) => {
  return apiClient.get(`/products/${id}`, { params: { start, end } })
}
