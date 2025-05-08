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
