import { Hasher } from '@/Application/Contracts/Criptography/Hasher'
import { ConflictError } from '@/Application/Contracts/Errors/ConflictError'
import { UserRepository } from '@/Application/Contracts/Repositories/UserRepository'
import { SignUpParams, SignUpResponse } from '@/Domain/Users/Models/User'
import { SignUp } from '@/Domain/Users/UseCases/SignUp'

export class SignUpUseCase implements SignUp {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encrypter: Hasher
  ) {}

  async signUp(params: SignUpParams): Promise<SignUpResponse> {
    const isEmailOrUsernameInUse =
      await this.userRepository.isEmailOrUsernameInUse({
        email: params.email,
        username: params.username
      })

    const hashedPassword = await this.encrypter.hash(params.password)

    if (isEmailOrUsernameInUse) {
      throw new ConflictError('User already exits with email or username')
    }

    const user = await this.userRepository.createUserRespository({
      email: params.email,
      first_name: params.first_name,
      last_name: params.last_name,
      password: hashedPassword,
      username: params.username
    })

    return user
  }
}
