import { Encrypter } from '@/Application/Contracts/Criptography/Encrypter'
import { Hasher } from '@/Application/Contracts/Criptography/Hasher'
import { ConflictError } from '@/Application/Contracts/Errors/ConflictError'
import { UserRepository } from '@/Application/Contracts/Repositories/UserRepository'
import { SignUpParams, SignUpResponse } from '@/Domain/Users/Models/User'
import { SignUp } from '@/Domain/Users/UseCases/SignUp'

export class SignUpUseCase implements SignUp {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher,
    private readonly encrypter: Encrypter
  ) {}

  async signUp(params: SignUpParams): Promise<SignUpResponse> {
    const isEmailInUse = await this.userRepository.isEmailInUse(params.email)

    if (isEmailInUse) {
      throw new ConflictError(`An email already exits with ${params.email}`)
    }

    const isUsernameInUse = await this.userRepository.isUsernameInUse(
      params.username
    )

    if (isUsernameInUse) {
      throw new ConflictError(
        `An username already exits with ${params.username}`
      )
    }

    const hashedPassword = await this.hasher.hash(params.password)

    const user = await this.userRepository.createUser({
      ...params,
      password: hashedPassword
    })

    const jwt = await this.encrypter.encrypt(user)

    return {
      access_token: jwt
    }
  }
}
