import { SignInUseCase } from '@/Application/Modules/Authentication/UseCases/SignInUseCase/SignInUseCase'
import { SignInController } from '@/Presentation/Controllers/SignInController/SignInController'
import { userRepository } from '../../SignUp/Dependencies/UserRepository'
import { bcryptAdapter, jwtAdapter } from '@/Main/Dependencies/Infrastructure'
import { z } from 'zod'
import { ZodAdapter } from '@/Main/Libs/Zod/ZodAdapter'
import { SignInParams } from '@/Domain/Authentication/UseCases/SignIn'
import { Router } from 'express'

export const signInRouter = Router()

const signInUseCause = new SignInUseCase(
  userRepository,
  bcryptAdapter,
  jwtAdapter
)

const signInSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty()
}) satisfies z.Schema<SignInParams>

const signInValidation = new ZodAdapter(signInSchema)

export const signInController = new SignInController(
  signInUseCause,
  signInValidation
)

signInRouter.post('/api/auth/sign-in', async (req, res) => {
  const response = await signInController.handle({ body: req.body })
  res.cookie('jwt', response.body?.jwt)
  res.status(response.status_code).json({})
})
