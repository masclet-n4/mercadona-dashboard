
import * as productsService from './service.js'

export async function getProducts(request, reply) {
  const { page = 1, limit = 10, filter = '' } = request.query
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

export async function getProductById(request, reply) {
  const { id } = request.params
  try {
    const product = await productsService.getProductById(request.server.pb, id)

    return reply.code(200).send({
      success: true,
      data: product
    })
  } catch (error) {
    request.log.error(error)

    return reply.code(500).send({
      success: false,
      message: 'Error al obtener los producto'
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

export async function getStats(request, reply) {
  const { page = 1, limit = 10, filter = '', sort = '' } = request.query
  try {
    const stats = await productsService.getAllStats(request.server.pb, { page, limit, filter, sort })

    return reply.code(200).send({
      success: true,
      data: stats
    })
  } catch (error) {
    request.log.error(error)

    return reply.code(500).send({
      success: false,
      message: 'Error al obtener los productos'
    })
  }
}
