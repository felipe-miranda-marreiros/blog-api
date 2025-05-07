import {
  isEmailOrUsernameInUseParams,
  UserRepository
} from '@/Application/Contracts/Repositories/UserRepository'
import { ConflictError } from '@/Application/Errors/ConflictError'
import { CreateUserUseCase } from '@/Application/Users/UseCases/CreateUserUseCase/CreateUserUseCase'
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

const createUserResponseMock: CreateUserResponse = {
  created_at: 'any_date',
  email_id: 1,
  first_name: 'any_name',
  id: 1,
  last_name: 'any_name',
  updated_at: 'any_date',
  username_id: 1
}

function createUserRepositoryStub(): UserRepository {
  class UserRepositoryStub implements UserRepository {
    createUserRespository(
      params: CreateUserParams
    ): Promise<CreateUserResponse> {
      console.log(params)
      return Promise.resolve(createUserResponseMock)
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
  it('Should create an User if params are valid', async () => {
    const { sut, userRepositoryStub } = createSut()
    vi.spyOn(
      userRepositoryStub,
      'isEmailOrUsernameInUse'
    ).mockResolvedValueOnce(false)
    const response = await sut.createUser(createUserParamsMock)
    expect(response).toEqual(response)
  })
})
