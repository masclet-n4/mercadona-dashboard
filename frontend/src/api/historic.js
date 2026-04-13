
import apiClient from './client.js'

export const getHistoric = ({ id, start = '', end = '' }) => {
  return apiClient.get(`/products/historical/${id}`, { params: { start, end } })
}
