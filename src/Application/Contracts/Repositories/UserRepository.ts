import { SignUpParams, User } from '@/Domain/Users/Models/User'

export interface UserRepository {
  createUser(params: SignUpParams): Promise<Omit<User, 'password'>>
  isEmailInUse(email: string): Promise<boolean>
  isUsernameInUse(username: string): Promise<boolean>
}
