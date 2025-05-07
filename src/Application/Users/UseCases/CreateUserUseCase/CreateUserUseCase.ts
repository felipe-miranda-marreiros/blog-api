import { UserRepository } from '@/Application/Contracts/Repositories/UserRepository'
import { ConflictError } from '@/Application/Errors/ConflictError'
import {
  CreateUserParams,
  CreateUserResponse
} from '@/Domain/Users/Models/User'
import { CreateUser } from '@/Domain/Users/UseCases/CreateUser'

export class CreateUserUseCase implements CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(params: CreateUserParams): Promise<CreateUserResponse> {
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
