import { UserRepository } from '@/Application/Contracts/Repositories/UserRepository'
import { ConflictError } from '@/Application/Errors/ConflictError'
import { CreateUserUseCase } from '@/Application/Users/UseCases/CreateUserUseCase/CreateUserUseCase'
import {
  createUserParamsMock,
  createUserResponseMock
} from '@/Tests/Mocks/Domain/User/UseCases'
import { createUserRepositoryStub } from '@/Tests/Mocks/Repositories/UserRepositoryMock'

interface Sut {
  sut: CreateUserUseCase
  userRepositoryStub: UserRepository
}

function createSut(): Sut {
  const userRepositoryStub = createUserRepositoryStub(createUserResponseMock)
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
    jest
      .spyOn(userRepositoryStub, 'isEmailOrUsernameInUse')
      .mockResolvedValueOnce(false)
    const response = await sut.createUser(createUserParamsMock)
    expect(response).toEqual(response)
  })
})
