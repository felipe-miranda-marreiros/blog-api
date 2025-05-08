import {
  CreateUserParams,
  CreateUserResponse
} from '@/Domain/Users/Models/User'
import { CreateUser } from '@/Domain/Users/UseCases/CreateUser'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '@/Presentation/Contracts/Controller'
import { Validation } from '@/Presentation/Contracts/Validation'

export class CreateUserController implements Controller {
  constructor(
    private readonly createUserUseCase: CreateUser,
    private readonly validation: Validation
  ) {}

  async handle(
    request: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<CreateUserResponse>> {
    const result = this.validation.validate(request.body)
    const user = await this.createUserUseCase.createUser(result)
    return {
      status_code: 200,
      body: user
    }
  }
}
