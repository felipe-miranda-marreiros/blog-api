import { HashComparer } from '@/Application/Contracts/Criptography/HashComparer'
import { Hasher } from '@/Application/Contracts/Criptography/Hasher'
import { ConflictError } from '@/Application/Contracts/Errors/ConflictError'
import { UserRepository } from '@/Application/Contracts/Repositories/UserRepository'
import { SignUpUseCase } from '@/Application/Modules/Users/UseCases/SignUpUseCase/SignUpUseCase'
import { createHasherStub } from '@/Tests/Mocks/Criptography/HasherMock'
import {
  signUpParamsMock,
  signUpResponseMock
} from '@/Tests/Mocks/Domain/User/UseCases'
import { createUserRepositoryStub } from '@/Tests/Mocks/Repositories/UserRepositoryMock'

interface Sut {
  sut: SignUpUseCase
  userRepositoryStub: UserRepository
  encrypterStub: Hasher & HashComparer
}

function createSut(): Sut {
  const userRepositoryStub = createUserRepositoryStub(signUpResponseMock)
  const encrypterStub = createHasherStub()
  const sut = new SignUpUseCase(userRepositoryStub, encrypterStub)
  return {
    sut,
    userRepositoryStub,
    encrypterStub
  }
}

describe('SignUp UseCase', () => {
  it('Should not create an User if email or username is already in use', async () => {
    const { sut, userRepositoryStub } = createSut()
    jest
      .spyOn(userRepositoryStub, 'isEmailOrUsernameInUse')
      .mockRejectedValueOnce(new ConflictError('any_message'))
    const promise = sut.signUp(signUpParamsMock)
    await expect(promise).rejects.toThrow(ConflictError)
  })
  it('Should create an User if params are valid', async () => {
    const { sut } = createSut()
    const response = await sut.signUp(signUpParamsMock)
    expect(response).toEqual(response)
  })
  it('Should throw if Hasher throws', async () => {
    const { sut, encrypterStub } = createSut()
    jest.spyOn(encrypterStub, 'hash').mockRejectedValueOnce(new Error())
    const promise = sut.signUp(signUpParamsMock)
    await expect(promise).rejects.toThrow()
  })
  it('Should call Hasher witch correct values', async () => {
    const { sut, encrypterStub } = createSut()
    const hashedPassword = jest.spyOn(encrypterStub, 'hash')
    await sut.signUp(signUpParamsMock)
    expect(hashedPassword).toHaveBeenCalledWith(signUpParamsMock.password)
  })
})
