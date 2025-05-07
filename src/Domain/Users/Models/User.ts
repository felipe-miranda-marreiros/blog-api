export interface User {
  id: number
  email_id: number
  username_id: number
  password: string
  first_name: string
  last_name: string
  created_at: string
  updated_at: string
}

export type CreateUserParams = {
  username: string
  password: string
  first_name: string
  last_name: string
  email: string
}

export type CreateUserResponse = Omit<User, 'password'>
