import { Encrypter } from '@/Application/Contracts/Criptography/Encrypter'
import { HashComparer } from '@/Application/Contracts/Criptography/HashComparer'
import { NotFoundError } from '@/Application/Contracts/Errors/NotFoundError'
import { UserRepository } from '@/Application/Contracts/Repositories/UserRepository'
import { SignInUseCase } from '@/Application/Modules/Authentication/UseCases/SignInUseCase/SignInUseCase'
import { SignIn } from '@/Domain/Authentication/UseCases/SignIn'
import { createEncrypterStub } from '@/Tests/Mocks/Criptography/EncrypterMock'
import { createHasherStub } from '@/Tests/Mocks/Criptography/HasherMock'
import { signInParamsMock } from '@/Tests/Mocks/Domain/SignIn/SignInMock'
import { createUserRepositoryMock } from '@/Tests/Mocks/Domain/User/UseCases'
import { createUserRepositoryStub } from '@/Tests/Mocks/Repositories/UserRepositoryMock'

interface Sut {
  sut: SignIn
  userRepositoryStub: UserRepository
  hasherStub: HashComparer
  encrypterStub: Encrypter
}

function createSut(): Sut {
  const userRepositoryStub = createUserRepositoryStub(createUserRepositoryMock)
  const hasherStub = createHasherStub()
  const encrypterStub = createEncrypterStub()
  const sut = new SignInUseCase(userRepositoryStub, hasherStub, encrypterStub)
  return {
    sut,
    userRepositoryStub,
    encrypterStub,
    hasherStub
  }
}

describe('SignIn Controller', () => {
  it('Should return NotFoundError if getUserByEmail returns undefined', async () => {
    const { sut, userRepositoryStub } = createSut()
    jest
      .spyOn(userRepositoryStub, 'getUserByEmail')
      .mockResolvedValueOnce(undefined)
    const promise = sut.signIn(signInParamsMock)
    await expect(promise).rejects.toThrow(NotFoundError)
  })
  it('Should call getUserByEmail with correct values', async () => {
    const { sut, userRepositoryStub } = createSut()
    const getUserByEmailSpy = jest.spyOn(userRepositoryStub, 'getUserByEmail')
    await sut.signIn(signInParamsMock)
    expect(getUserByEmailSpy).toHaveBeenCalledWith(signInParamsMock.email)
  })
})
