import { CreateUserResponse } from '@/Domain/Users/Models/User'

export interface isEmailOrUsernameInUseParams {
  email: string
  username: string
}

export interface UserRepository {
  createUserRespository(params: CreateUserResponse): Promise<CreateUserResponse>
  isEmailOrUsernameInUse(params: isEmailOrUsernameInUseParams): Promise<boolean>
}
