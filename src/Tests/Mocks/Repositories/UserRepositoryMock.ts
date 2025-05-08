import {
  isEmailOrUsernameInUseParams,
  UserRepository
} from '@/Application/Contracts/Repositories/UserRepository'
import { SignUpParams, SignUpResponse } from '@/Domain/Users/Models/User'

export function createUserRepositoryStub(
  response: SignUpResponse
): UserRepository {
  class UserRepositoryStub implements UserRepository {
    createUserRespository(params: SignUpParams): Promise<SignUpResponse> {
      return Promise.resolve(response)
    }
    isEmailOrUsernameInUse(
      params: isEmailOrUsernameInUseParams
    ): Promise<boolean> {
      return Promise.resolve(false)
    }
  }
  return new UserRepositoryStub()
}
