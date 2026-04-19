import fp from 'fastify-plugin'
import PocketBase from 'pocketbase'

export default fp(async function pocketbasePlugin(fastify) {
  const pb = new PocketBase(fastify.config.POCKETBASE_URL)

  const authenticate = async () => {
    try {
    await pb.collection('_superusers').authWithPassword(
      fastify.config.PB_EMAIL,
      fastify.config.PB_PASSWORD
    )
      console.log("PocketBase authenticated successfully!")
    } catch (error) {
      console.error("PocketBase authentication failed:", error)
      throw error
    }
  }

  await authenticate()

  const pbRequest = async (fn) => {
    try {
      return await fn(pb)
    } catch (error) {
      if (error.status === 401) {
        console.log("PocketBase token expired. Attempting to refresh...")
        await authenticate()
        return await fn(pb)
      }
      console.error("PocketBase request failed:", error)
      throw error
    }
  }

  fastify.decorate('pb', pb)
  fastify.decorate('pbRequest', pbRequest)
})
