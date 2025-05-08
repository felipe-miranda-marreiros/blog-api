import { SignUpParams, SignUpResponse } from '../Models/User'

export interface SignUp {
  signUp(params: SignUpParams): Promise<SignUpResponse>
}
