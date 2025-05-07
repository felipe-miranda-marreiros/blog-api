import { CreateUserParams, CreateUserResponse } from '../Models/User'

export interface CreateUser {
  createUser(params: CreateUserParams): Promise<CreateUserResponse>
}
