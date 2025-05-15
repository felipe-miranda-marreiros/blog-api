import { LoggedInUser } from '../Models/User'

export interface CurrentUser {
  getUser(): Promise<LoggedInUser>
}
