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

export class CreateUserController implements Controller {
  constructor(private readonly createUserUseCase: CreateUser) {}

  async handle(
    request: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<CreateUserResponse>> {
    const user = await this.createUserUseCase.createUser(request.body)
    return {
      status_code: 200,
      body: user
    }
  }
}
