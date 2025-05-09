import { SignUpParams } from '@/Domain/Authentication/UseCases/SignUp'
import { LoggedInUser } from '@/Domain/Users/Models/User'

export interface UserRepository {
  createUser(params: SignUpParams): Promise<LoggedInUser>
  isEmailInUse(email: string): Promise<boolean>
  isUsernameInUse(username: string): Promise<boolean>
}
