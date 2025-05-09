import { LoggedInUser } from '@/Domain/Users/Models/User'

export interface AuthenticationParams {
  jwt: string
}

export type AuthenticationResponse = LoggedInUser

export interface Authentication {
  auth(params: AuthenticationParams): Promise<AuthenticationResponse>
}
