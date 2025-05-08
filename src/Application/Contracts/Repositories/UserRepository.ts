import { SignUpParams, SignUpResponse } from '@/Domain/Users/Models/User'

export interface isEmailOrUsernameInUseParams {
  email: string
  username: string
}

export interface UserRepository {
  createUserRespository(params: SignUpParams): Promise<SignUpResponse>
  isEmailOrUsernameInUse(params: isEmailOrUsernameInUseParams): Promise<boolean>
}
