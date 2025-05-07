import { UserRepository } from '@/Domain/Application/Contracts/Repositories/UserRepository'
import { ConflictError } from '@/Domain/Application/Errors/ConflictError'
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
      throw new ConflictError('')
    }

    return Promise.reject()
  }
}
