import { Router } from 'express'
import { expressControllerAdapter } from '../../../Express/ExpressControllerAdapter'
import { CreateUserController } from '@/Presentation/Controllers/CreateUserController/CreateUserController'
import { CreateUserUseCase } from '@/Application/Users/UseCases/CreateUserUseCase/CreateUserUseCase'
import { userRepository } from '../Dependencies/UserRepository'

export const userRoutes = Router()

const createUserUseCase = new CreateUserUseCase(userRepository)
const createUserController = new CreateUserController(createUserUseCase)

userRoutes.post('/api/users', expressControllerAdapter(createUserController))
