import {
  isEmailOrUsernameInUseParams,
  UserRepository
} from '@/Application/Contracts/Repositories/UserRepository'
import {
  CreateUserParams,
  CreateUserResponse
} from '@/Domain/Users/Models/User'

export function createUserRepositoryStub(
  response: CreateUserResponse
): UserRepository {
  class UserRepositoryStub implements UserRepository {
    createUserRespository(
      params: CreateUserParams
    ): Promise<CreateUserResponse> {
      console.log(params)
      return Promise.resolve(response)
    }
    isEmailOrUsernameInUse(
      params: isEmailOrUsernameInUseParams
    ): Promise<boolean> {
      console.log(params)
      return Promise.resolve(true)
    }
  }
  return new UserRepositoryStub()
}
