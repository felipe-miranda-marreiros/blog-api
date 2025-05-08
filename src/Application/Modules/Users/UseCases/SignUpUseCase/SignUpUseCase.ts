import { ConflictError } from '@/Application/Contracts/Errors/ConflictError'
import { UserRepository } from '@/Application/Contracts/Repositories/UserRepository'
import { SignUpParams, SignUpResponse } from '@/Domain/Users/Models/User'
import { SignUp } from '@/Domain/Users/UseCases/SignUp'

export class SignUpUseCase implements SignUp {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(params: SignUpParams): Promise<SignUpResponse> {
    const isEmailOrUsernameInUse =
      await this.userRepository.isEmailOrUsernameInUse({
        email: params.email,
        username: params.username
      })

    if (isEmailOrUsernameInUse) {
      throw new ConflictError('User already exits with email or username')
    }

    const user = await this.userRepository.createUserRespository(params)

    return user
  }
}
