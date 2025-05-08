import {
  CreateUserParams,
  CreateUserResponse
} from '@/Domain/Users/Models/User'
import { CreateUser } from '@/Domain/Users/UseCases/CreateUser'
import { CreateUserController } from '@/Presentation/Controllers/CreateUserController/CreateUserController'
import {
  createUserParamsMock,
  createUserResponseMock
} from '@/Tests/Mocks/Domain/User/UseCases'

describe('CreateUser Controller', () => {
  it('Should return 200 if User is created successfully', async () => {
    class CreateUserUseCaseStub implements CreateUser {
      createUser(params: CreateUserParams): Promise<CreateUserResponse> {
        return Promise.resolve(createUserResponseMock)
      }
    }
    const createUserUseCaseStub = new CreateUserUseCaseStub()
    const sut = new CreateUserController(createUserUseCaseStub)
    const response = await sut.handle({ body: createUserParamsMock })
    expect(response.body?.first_name).toEqual(createUserResponseMock.first_name)
    expect(response.body?.last_name).toEqual(createUserResponseMock.last_name)
    expect(response.status_code).toBe(200)
  })
})
