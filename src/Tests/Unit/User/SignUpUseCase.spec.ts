import { ConflictError } from '@/Application/Contracts/Errors/ConflictError'
import { UserRepository } from '@/Application/Contracts/Repositories/UserRepository'
import { SignUpUseCase } from '@/Application/Modules/Users/UseCases/SignUpUseCase/SignUpUseCase'
import {
  signUpParamsMock,
  signUpResponseMock
} from '@/Tests/Mocks/Domain/User/UseCases'
import { createUserRepositoryStub } from '@/Tests/Mocks/Repositories/UserRepositoryMock'

interface Sut {
  sut: SignUpUseCase
  userRepositoryStub: UserRepository
}

function createSut(): Sut {
  const userRepositoryStub = createUserRepositoryStub(signUpResponseMock)
  const sut = new SignUpUseCase(userRepositoryStub)
  return {
    sut,
    userRepositoryStub
  }
}

describe('CreateUser UseCase', () => {
  it('Should not create an User if email or username is already in use', async () => {
    const { sut } = createSut()
    const promise = sut.signUp(signUpParamsMock)
    await expect(promise).rejects.toThrow(ConflictError)
  })
  it('Should create an User if params are valid', async () => {
    const { sut, userRepositoryStub } = createSut()
    jest
      .spyOn(userRepositoryStub, 'isEmailOrUsernameInUse')
      .mockResolvedValueOnce(false)
    const response = await sut.signUp(signUpParamsMock)
    expect(response).toEqual(response)
  })
})
