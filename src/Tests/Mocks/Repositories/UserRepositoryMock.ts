import { UserRepository } from '@/Application/Contracts/Repositories/UserRepository'
import { SignUpParams, User } from '@/Domain/Users/Models/User'

export function createUserRepositoryStub(
  response: Omit<User, 'password'>
): UserRepository {
  class UserRepositoryStub implements UserRepository {
    isEmailInUse(email: string): Promise<boolean> {
      return Promise.resolve(false)
    }
    isUsernameInUse(username: string): Promise<boolean> {
      return Promise.resolve(false)
    }
    createUser(params: SignUpParams): Promise<Omit<User, 'password'>> {
      return Promise.resolve(response)
    }
  }
  return new UserRepositoryStub()
}
