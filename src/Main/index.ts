import 'dotenv/config'
import { fastify } from './Fastify/Fastify'

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
