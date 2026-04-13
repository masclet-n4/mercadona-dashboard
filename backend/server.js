
import { buildServer } from './app.js'

const server = await buildServer();

await server.listen({
  port: 3000,
  host: '0.0.0.0'
})
