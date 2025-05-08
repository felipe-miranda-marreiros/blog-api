import {
  CreateUserParams,
  CreateUserResponse
} from '@/Domain/Users/Models/User'

export const createUserParamsMock: CreateUserParams = {
  email: 'any_email',
  first_name: 'any_first_name',
  last_name: 'any_last_name',
  password: 'any_password',
  username: 'any_username'
}

export const createUserResponseMock: CreateUserResponse = {
  created_at: 'any_date',
  email_id: 1,
  first_name: 'any_name',
  id: 1,
  last_name: 'any_name',
  updated_at: 'any_date',
  username_id: 1
}
