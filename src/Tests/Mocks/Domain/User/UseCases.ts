import { SignUpParams, SignUpResponse } from '@/Domain/Users/Models/User'

export const signUpParamsMock: SignUpParams = {
  email: 'any_email',
  first_name: 'any_first_name',
  last_name: 'any_last_name',
  password: 'any_password',
  username: 'any_username'
}

export const signUpResponseMock: SignUpResponse = {
  created_at: 'any_date',
  email_id: 1,
  first_name: 'any_name',
  id: 1,
  last_name: 'any_name',
  updated_at: 'any_date',
  username_id: 1
}
