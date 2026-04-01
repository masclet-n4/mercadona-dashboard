import fp from 'fastify-plugin'
import fastifyEnv from '@fastify/env'

const schema = {
  type: 'object',
  required: [
    'POCKETBASE_URL',
    'PB_EMAIL',
    'PB_PASSWORD'
  ],
  properties: {
    POCKETBASE_URL: { type: 'string' },
    PB_EMAIL: { type: 'string' },
    PB_PASSWORD: { type: 'string' },
  }
}

export default fp(async function envPlugin(fastify) {
  await fastify.register(fastifyEnv, {
    confKey: 'config',
    schema,
    dotenv: true
  })
  console.log("Environment variables loaded!")
})
