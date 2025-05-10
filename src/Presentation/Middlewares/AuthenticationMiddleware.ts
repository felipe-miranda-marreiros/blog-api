import {
  Authentication,
  AuthenticationParams,
  AuthenticationResponse
} from '@/Domain/Authentication/UseCases/Authentication'
import { Cookies, Headers, HttpRequest, HttpResponse } from '../Contracts/Http'
import { Middleware } from '../Contracts/Middleware'

export class AuthenticationMiddleware implements Middleware {
  constructor(private readonly authentication: Authentication) {}

  async handle(
    request: HttpRequest,
    cookies: Cookies<AuthenticationParams>,
    headers: Headers
  ): Promise<HttpResponse<AuthenticationResponse>> {
    const { current_user } = await this.authentication.auth(cookies.data)
    return {
      status_code: 200,
      body: {
        current_user
      }
    }
  }
}
