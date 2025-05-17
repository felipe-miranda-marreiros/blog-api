import Fastify from 'fastify'
import cookie from '@fastify/cookie'
import { signInRoute } from '../Routes/Authentication/SignIn/SignInRoute/SignInRoute'
import { signUpRoute } from '../Routes/Authentication/SignUp/SignUpRoute/SignUpRoute'

export const fastify = Fastify({ logger: true })
fastify.register(cookie)
fastify.register(signInRoute)
fastify.register(signUpRoute)
