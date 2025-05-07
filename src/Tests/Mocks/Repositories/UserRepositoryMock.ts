import {
  isEmailOrUsernameInUseParams,
  UserRepository
} from '@/Application/Contracts/Repositories/UserRepository'
import { CreateUserResponse } from '@/Domain/Users/Models/User'

export function createUserRepositoryStub(): UserRepository {
  class UserRepositoryStub implements UserRepository {
    createUserRespository(
      params: CreateUserResponse
    ): Promise<CreateUserResponse> {
      console.log(params)
      return Promise.resolve({
        created_at: 'any_date',
        email_id: 1,
        first_name: 'any_name',
        id: 1,
        last_name: 'any_name',
        updated_at: 'any_date',
        username_id: 1
      })
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
