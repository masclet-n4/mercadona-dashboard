
import { getProducts, getHistorical, getProductById } from './controller.js'

export default async function productsRoutes(app) {
  app.get('/', getProducts)

  app.get('/:id', getProductById)

  app.get('/historical/:id', getHistorical)
}
