import Fastify from 'fastify'
import cors from '@fastify/cors'
import env from './plugins/env.js'
import pocketbase from './plugins/db.js'

import productsRoutes from './modules/products/routes.js'


export async function buildServer() {
  const app = Fastify({
    logger: true,
    trustProxy: true
  })

  await app.register(cors, {
    origin: true
  })

  await app.register(env)
  await app.register(pocketbase)

  await app.register(productsRoutes, { prefix: '/products' })

  return app
}
