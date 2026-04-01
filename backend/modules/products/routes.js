
import { getProducts, getHistorical } from './controller.js'

export default async function productsRoutes(app) {
  app.get('/', getProducts)

  app.get('/:id', getHistorical)
}
