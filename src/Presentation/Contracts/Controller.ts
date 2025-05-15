import { Cookies, Headers, HttpRequest, HttpResponse } from './Http'

export interface Controller {
  handle(
    request: HttpRequest,
    cookies: Cookies,
    headers: Headers
  ): Promise<HttpResponse>
}
