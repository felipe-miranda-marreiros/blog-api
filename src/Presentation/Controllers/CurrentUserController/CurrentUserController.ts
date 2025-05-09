import { LoggedInUser } from '@/Domain/Users/Models/User'
import { CurrentUser } from '@/Domain/Users/UseCases/CurrentUser'
import { Controller } from '@/Presentation/Contracts/Controller'
import { HttpResponse } from '@/Presentation/Contracts/Http'

export class CurrentUserController implements Controller {
  constructor(private readonly currentUserUseCase: CurrentUser) {}

  async handle(): Promise<HttpResponse<LoggedInUser>> {
    const loggedInUser = await this.currentUserUseCase.getUser()
    return {
      status_code: 200,
      body: loggedInUser
    }
  }
}
