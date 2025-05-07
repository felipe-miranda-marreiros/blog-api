import { ConflictError } from '@/Domain/Application/Errors/ConflictError'
import { CreateUserUseCase } from './CreateUserUseCase'
import {
  isEmailOrUsernameInUseParams,
  UserRepository
} from '@/Domain/Application/Contracts/Repositories/UserRepository'
import {
  CreateUserParams,
  CreateUserResponse
} from '@/Domain/Users/Models/User'

const createUserParamsMock: CreateUserParams = {
  email: 'any_email',
  first_name: 'any_first_name',
  last_name: 'any_last_name',
  password: 'any_password',
  username: 'any_username'
}

function createUserRepositoryStub(): UserRepository {
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

interface Sut {
  sut: CreateUserUseCase
  userRepositoryStub: UserRepository
}

function createSut(): Sut {
  const userRepositoryStub = createUserRepositoryStub()
  const sut = new CreateUserUseCase(userRepositoryStub)
  return {
    sut,
    userRepositoryStub
  }
}

describe('CreateUser UseCase', () => {
  it('Should not create an User if email or username is already in use', async () => {
    const { sut } = createSut()
    const promise = sut.createUser(createUserParamsMock)
    await expect(promise).rejects.toThrow(ConflictError)
  })
})
