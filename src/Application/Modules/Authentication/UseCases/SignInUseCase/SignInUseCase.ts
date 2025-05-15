import { Encrypter } from '@/Application/Contracts/Criptography/Encrypter'
import { HashComparer } from '@/Application/Contracts/Criptography/HashComparer'
import { NotFoundError } from '@/Application/Contracts/Errors/NotFoundError'
import { UnauthorizedError } from '@/Application/Contracts/Errors/UnauthorizedError'
import { UserRepository } from '@/Application/Contracts/Repositories/UserRepository'
import {
  SignIn,
  SignInParams,
  SignInResponse
} from '@/Domain/Authentication/UseCases/SignIn'
import { LoggedInUser } from '@/Domain/Users/Models/User'

export class SignInUseCase implements SignIn {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasherComparer: HashComparer,
    private readonly encryper: Encrypter
  ) {}

  async signIn(params: SignInParams): Promise<SignInResponse> {
    const user = await this.userRepository.getUserByEmail(params.email)

    if (!user) {
      throw new NotFoundError('User not found')
    }

    const { password, ...rest } = user

    const isPasswordEqual = await this.hasherComparer.compare(
      params.password,
      password
    )

    if (!isPasswordEqual) {
      throw new UnauthorizedError('Email or password invalid')
    }

    const jwt = await this.encryper.encrypt<LoggedInUser>(rest)

    return {
      jwt
    }
  }
}
