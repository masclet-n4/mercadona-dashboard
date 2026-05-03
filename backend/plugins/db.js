import fp from 'fastify-plugin'
import PocketBase from 'pocketbase'

const TOKEN_REFRESH_INTERVAL_MS = 23 * 60 * 60 * 1000 // 23 hours

export default fp(async function pocketbasePlugin(fastify) {
  const pb = new PocketBase(fastify.config.POCKETBASE_URL)

  let authPromise = null

  const authenticate = async () => {
    if (authPromise) {
      return authPromise
    }
    authPromise = (async () => {
      try {
        await pb.collection('_superusers').authWithPassword(
          fastify.config.PB_EMAIL,
          fastify.config.PB_PASSWORD
        )
        console.log("[PocketBase] Authenticated successfully")
      } catch (error) {
        console.error("[PocketBase] Authentication failed:", error.message)
        throw error
      } finally {
        authPromise = null
      }
    })()
    return authPromise
  }

  await authenticate()

  const refreshTimer = setInterval(async () => {
    try {
      console.log("[PocketBase] Proactively refreshing token...")
      await authenticate()
    } catch (error) {
      console.error("[PocketBase] Proactive token refresh failed:", error.message)
    }
  }, TOKEN_REFRESH_INTERVAL_MS)
  refreshTimer.unref()

  const needsReauth = (error) => {
    return error.status === 401 || error.status === 403
  }

  const pbRequest = async (fn) => {
    try {
      return await fn(pb)
    } catch (error) {
      if (needsReauth(error)) {
        console.log(`[PocketBase] Token invalid (${error.status}). Re-authenticating...`)
        await authenticate()
        return await fn(pb)
      }
      console.error("[PocketBase] Request failed:", error.message)
      throw error
    }
  }

  fastify.decorate('pb', pb)
  fastify.decorate('pbRequest', pbRequest)

  fastify.addHook('onClose', () => {
    clearInterval(refreshTimer)
  })
})
