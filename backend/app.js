import Fastify from 'fastify'
import cors from '@fastify/cors'
import fastifyStatic from '@fastify/static'
import env from './plugins/env.js'
import pocketbase from './plugins/db.js'
import productsRoutes from './modules/products/routes.js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function buildServer() {
  const app = Fastify({
    logger: true,
    trustProxy: true
  })

  const isProduction = process.env.NODE_ENV === 'production'

  await app.register(cors, {
    origin: isProduction
      ? 'https://mercadona-dashboard.jccantos.com'
      : true,
    credentials: true
  })

  await app.register(fastifyStatic, {
    root: join(__dirname, 'public'),
    prefix: '/',
    index: 'index.html'
  })

  app.setErrorHandler((error, request, reply) => {
    if (request.url.startsWith('/api')) {
      reply.code(500).send({ error: error.message })
    } else {
      reply.sendFile('index.html')
    }
  })

  await app.register(env)
  await app.register(pocketbase)

  await app.register(productsRoutes, { prefix: '/products' })

  return app
}
