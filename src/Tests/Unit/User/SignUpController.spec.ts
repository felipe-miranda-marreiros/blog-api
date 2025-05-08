import { SignUpParams, SignUpResponse } from '@/Domain/Users/Models/User'
import { SignUp } from '@/Domain/Users/UseCases/SignUp'
import { Validation } from '@/Presentation/Contracts/Validation'
import { CreateUserController } from '@/Presentation/Controllers/SignUpController/SignUpController'
import {
  signUpParamsMock,
  signUpResponseMock
} from '@/Tests/Mocks/Domain/User/UseCases'

interface Sut {
  validationStub: Validation
  createUserUseCaseStub: SignUp
  sut: CreateUserController
}

function makeCreateUserUseCase(): SignUp {
  class CreateUserUseCaseStub implements SignUp {
    signUp(params: SignUpParams): Promise<SignUpResponse> {
      return Promise.resolve(signUpResponseMock)
    }
  }
  return new CreateUserUseCaseStub()
}

function makeValidation(): Validation {
  class ValidationStub implements Validation {
    validate<TData>(data: TData): TData {
      return data
    }
  }
  return new ValidationStub()
}

function createSut(): Sut {
  const validationStub = makeValidation()
  const createUserUseCaseStub = makeCreateUserUseCase()
  const sut = new CreateUserController(createUserUseCaseStub, validationStub)
  return {
    createUserUseCaseStub,
    validationStub,
    sut
  }
}

describe('CreateUser Controller', () => {
  it('Should return 200 if User is created successfully', async () => {
    const { sut } = createSut()
    const response = await sut.handle({ body: signUpParamsMock })
    expect(response.body?.first_name).toEqual(signUpResponseMock.first_name)
    expect(response.body?.last_name).toEqual(signUpResponseMock.last_name)
    expect(response.status_code).toBe(200)
  })
})
