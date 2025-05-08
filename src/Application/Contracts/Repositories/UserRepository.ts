import { SignUpParams, User } from '@/Domain/Users/Models/User'

export interface isEmailOrUsernameInUseParams {
  email: string
  username: string
}

export interface UserRepository {
  createUserRespository(params: SignUpParams): Promise<Omit<User, 'password'>>
  isEmailOrUsernameInUse(params: isEmailOrUsernameInUseParams): Promise<boolean>
}
