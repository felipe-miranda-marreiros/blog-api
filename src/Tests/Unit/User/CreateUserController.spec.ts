import {
  CreateUserParams,
  CreateUserResponse
} from '@/Domain/Users/Models/User'
import { CreateUser } from '@/Domain/Users/UseCases/CreateUser'
import { Validation } from '@/Presentation/Contracts/Validation'
import { CreateUserController } from '@/Presentation/Controllers/CreateUserController/CreateUserController'
import {
  createUserParamsMock,
  createUserResponseMock
} from '@/Tests/Mocks/Domain/User/UseCases'

interface Sut {
  validationStub: Validation
  createUserUseCaseStub: CreateUser
  sut: CreateUserController
}

function makeCreateUserUseCase(): CreateUser {
  class CreateUserUseCaseStub implements CreateUser {
    createUser(params: CreateUserParams): Promise<CreateUserResponse> {
      return Promise.resolve(createUserResponseMock)
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
    const response = await sut.handle({ body: createUserParamsMock })
    expect(response.body?.first_name).toEqual(createUserResponseMock.first_name)
    expect(response.body?.last_name).toEqual(createUserResponseMock.last_name)
    expect(response.status_code).toBe(200)
  })
})
