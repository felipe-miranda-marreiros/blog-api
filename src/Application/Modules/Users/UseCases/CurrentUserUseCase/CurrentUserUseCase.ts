import { UserContext } from '@/Application/Contracts/Context/UserContext'
import { LoggedInUser } from '@/Domain/Users/Models/User'
import { CurrentUser } from '@/Domain/Users/UseCases/CurrentUser'

export class CurrentUserUseCase implements CurrentUser {
  constructor(private readonly userContext: UserContext) {}

  getUser(): Promise<LoggedInUser> {
    return Promise.resolve(this.userContext.getLoggedInUser())
  }
}
