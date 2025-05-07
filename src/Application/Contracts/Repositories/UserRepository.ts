import {
  CreateUserParams,
  CreateUserResponse
} from '@/Domain/Users/Models/User'

export interface isEmailOrUsernameInUseParams {
  email: string
  username: string
}

export interface UserRepository {
  createUserRespository(params: CreateUserParams): Promise<CreateUserResponse>
  isEmailOrUsernameInUse(params: isEmailOrUsernameInUseParams): Promise<boolean>
}
