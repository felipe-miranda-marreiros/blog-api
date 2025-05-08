import {
  isEmailOrUsernameInUseParams,
  UserRepository
} from '@/Application/Contracts/Repositories/UserRepository'
import { SignUpParams, User } from '@/Domain/Users/Models/User'

export function createUserRepositoryStub(
  response: Omit<User, 'password'>
): UserRepository {
  class UserRepositoryStub implements UserRepository {
    createUserRespository(
      params: SignUpParams
    ): Promise<Omit<User, 'password'>> {
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
