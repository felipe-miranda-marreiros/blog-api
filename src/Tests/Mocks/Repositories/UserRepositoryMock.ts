import { UserRepository } from '@/Application/Contracts/Repositories/UserRepository'
import { SignUpParams } from '@/Domain/Authentication/UseCases/SignUp'
import { LoggedInUser } from '@/Domain/Users/Models/User'

export function createUserRepositoryStub(
  response: LoggedInUser
): UserRepository {
  class UserRepositoryStub implements UserRepository {
    isEmailInUse(email: string): Promise<boolean> {
      return Promise.resolve(false)
    }
    isUsernameInUse(username: string): Promise<boolean> {
      return Promise.resolve(false)
    }
    createUser(params: SignUpParams): Promise<LoggedInUser> {
      return Promise.resolve(response)
    }
  }
  return new UserRepositoryStub()
}
