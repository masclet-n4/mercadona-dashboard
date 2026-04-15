
import { getProducts, getHistorical, getProductById, getStats } from './controller.js'

export default async function productsRoutes(app) {
  app.get('/', getProducts)

  app.get('/:id', getProductById)

  app.get('/historical/:id', getHistorical)

  app.get('/stats', getStats)
}
