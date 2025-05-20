import { Router } from 'express'
import { CurrentUserUseCase } from '@/Application/Modules/Users/UseCases/CurrentUserUseCase/CurrentUserUseCase'
import { nodeUserContextAdapter } from '@/Infrastructure/Context/NodeUserContextAdapter'
import { CurrentUserController } from '@/Presentation/Controllers/CurrentUserController/CurrentUserController'
import { expressControllerAdapter } from '@/Main/Express/ExpressControllerAdapter'
import { expressMiddlewareAdapter } from '@/Main/Express/ExpressMiddlewareAdapter'
import { AuthenticationMiddleware } from '@/Presentation/Middlewares/AuthenticationMiddleware'
import { AuthenticationUseCase } from '@/Application/Modules/Authentication/UseCases/AuthenticationUseCase/AuthenticationUseCase'
import { jwtAdapter } from '@/Main/Dependencies/Infrastructure'
import { expressAuthenticationMiddleware } from '@/Main/Express/AuthMiddleware'

export const userRoutes = Router()

const authenticationUseCase = new AuthenticationUseCase(jwtAdapter)
export const authenticationMiddleware = new AuthenticationMiddleware(
  authenticationUseCase
)

const currentUserUsecase = new CurrentUserUseCase(nodeUserContextAdapter)
const currentUserController = new CurrentUserController(currentUserUsecase)

userRoutes.use(expressMiddlewareAdapter(authenticationMiddleware))
userRoutes.use(expressAuthenticationMiddleware)

userRoutes.get(
  '/api/users/current-user',
  expressControllerAdapter(currentUserController)
)
