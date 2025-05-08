import { Router } from 'express'
import { expressControllerAdapter } from '../../../Express/ExpressControllerAdapter'
import { CreateUserController } from '@/Presentation/Controllers/SignUpController/SignUpController'
import { SignUpUseCase } from '@/Application/Modules/Users/UseCases/SignUpUseCase/SignUpUseCase'
import { userRepository } from '../Dependencies/UserRepository'
import { ZodAdapter } from '@/Main/Zod/ZodAdapter'
import { z } from 'zod'
import { BcryptAdapter } from '@/Infrastructure/Cryptography/BcryptAdapter'

export const userRoutes = Router()
const bcryptAdapter = new BcryptAdapter(12)
const createUserUseCase = new SignUpUseCase(userRepository, bcryptAdapter)
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
