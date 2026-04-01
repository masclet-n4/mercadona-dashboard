import fp from 'fastify-plugin'
import PocketBase from 'pocketbase'

export default fp(async function pocketbasePlugin(fastify) {
  const pb = new PocketBase(fastify.config.POCKETBASE_URL)

  await pb.collection('_superusers').authWithPassword(
    fastify.config.PB_EMAIL,
    fastify.config.PB_PASSWORD
  )
  console.log("PocketBase connected!")

  fastify.decorate('pb', pb)
})
