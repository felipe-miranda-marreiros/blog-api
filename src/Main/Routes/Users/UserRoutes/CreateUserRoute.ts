import { Router } from 'express'
import { expressControllerAdapter } from '../../../Express/ExpressControllerAdapter'
import { CreateUserController } from '@/Presentation/Controllers/CreateUserController/CreateUserController'
import { CreateUserUseCase } from '@/Application/Users/UseCases/CreateUserUseCase/CreateUserUseCase'
import { userRepository } from '../Dependencies/UserRepository'
import { ZodAdapter } from '@/Main/Zod/ZodAdapter'
import { z } from 'zod'

export const userRoutes = Router()

const createUserUseCase = new CreateUserUseCase(userRepository)
const createUserSchema = z.object({
  email: z.string().email().nonempty(),
  first_name: z.string().nonempty(),
  last_name: z.string().nonempty(),
  password: z.string().nonempty(),
  username: z.string().nonempty()
})
const createUserValidation = new ZodAdapter(createUserSchema)
const createUserController = new CreateUserController(
  createUserUseCase,
  createUserValidation
)

userRoutes.post('/api/users', expressControllerAdapter(createUserController))
