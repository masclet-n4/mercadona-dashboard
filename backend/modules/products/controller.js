
import * as productsService from './service.js'

export async function getProducts(request, reply) {
  const { page = 1, limit = 10, filter } = request.query
  console.log({filter})
  try {
    const products = await productsService.getAllProducts(request.server.pb, { page, limit, filter: `nombre ~ "${filter}"` })

    return reply.code(200).send({
      success: true,
      data: products
    })
  } catch (error) {
    request.log.error(error)

    return reply.code(500).send({
      success: false,
      message: 'Error al obtener los productos'
    })
  }
}

export async function getHistorical(request, reply) {
  const { start, end } = request.query
  const { id } = request.params
  try {
    const data = await productsService.getHistoricalData(request.server.pb, { id, start, end })

    return reply.code(200).send({
      success: true,
      data
    })
  } catch (error) {
    request.log.error(error)

    return reply.code(500).send({
      success: false,
      message: 'Error al obtener los productos'
    })
  }
}
