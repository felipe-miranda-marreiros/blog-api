import { SignUpParams, SignUpResponse } from '@/Domain/Users/Models/User'
import { SignUp } from '@/Domain/Users/UseCases/SignUp'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '@/Presentation/Contracts/Controller'
import { Validation } from '@/Presentation/Contracts/Validation'

export class SignUpController implements Controller {
  constructor(
    private readonly createUserUseCase: SignUp,
    private readonly validation: Validation
  ) {}

  async handle(
    request: HttpRequest<SignUpParams>
  ): Promise<HttpResponse<SignUpResponse>> {
    const result = this.validation.validate(request.body)
    const accessToken = await this.createUserUseCase.signUp(result)
    return {
      status_code: 200,
      body: accessToken
    }
  }
}
