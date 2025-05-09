import { Router } from 'express'
import { SignUpController } from '@/Presentation/Controllers/SignUpController/SignUpController'
import { SignUpUseCase } from '@/Application/Modules/Authentication/UseCases/SignUpUseCase/SignUpUseCase'
import { userRepository } from '../Dependencies/UserRepository'
import { ZodAdapter } from '@/Main/Zod/ZodAdapter'
import { z } from 'zod'
import { bcryptAdapter, jwtAdapter } from '@/Main/Dependencies/Infrastructure'
import { SignUpParams } from '@/Domain/Authentication/UseCases/SignUp'

export const signUpRoutes = Router()

const createUserUseCase = new SignUpUseCase(
  userRepository,
  bcryptAdapter,
  jwtAdapter
)
const createUserSchema = z.object({
  email: z.string().email().nonempty(),
  first_name: z.string().nonempty(),
  last_name: z.string().nonempty(),
  password: z.string().nonempty(),
  username: z.string().nonempty()
}) satisfies z.Schema<SignUpParams>

const createUserValidation = new ZodAdapter(createUserSchema)
const signUpController = new SignUpController(
  createUserUseCase,
  createUserValidation
)

signUpRoutes.post('/api/auth/sign-up', async (req, res) => {
  const response = await signUpController.handle({ body: req.body })
  res.cookie('jwt', response.body?.access_token)
  res.status(response.status_code).json({})
})
