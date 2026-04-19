
import * as productsService from './service.js'

export async function getProducts(request, reply) {
  const { page = 1, limit = 10, filter = '' } = request.query
  try {
    const products = await request.server.pbRequest(pb => productsService.getAllProducts(pb, { page, limit, filter: `nombre ~ "${filter}"` }))

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
    const product = await request.server.pbRequest(pb => productsService.getProductById(pb, id))

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

    const data = await request.server.pbRequest(pb => productsService.getHistoricalData(pb, { id, start, end }))

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

    const stats = await request.server.pbRequest(pb => productsService.getAllStats(pb, { page, limit, filter, sort }))

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
