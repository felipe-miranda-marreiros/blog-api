import { Controller } from '@/Presentation/Contracts/Controller'
import { Cookies, Headers, HttpRequest } from '@/Presentation/Contracts/Http'
import { FastifyRequest, FastifyReply } from 'fastify'

export function fastifyControllerAdapter(controller: Controller) {
  return async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const cookies: Cookies = {
      data: req.cookies
    }
    const headers: Headers = {
      data: req.headers
    }
    const httpResponse = await controller.handle(httpRequest, cookies, headers)
    reply.status(httpResponse.status_code).send(httpResponse.body)
  }
}
