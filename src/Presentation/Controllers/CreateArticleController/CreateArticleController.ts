import {
  CreateArticle,
  CreateArticleParams
} from '@/Domain/Articles/UseCases/CreateArticle'
import { Controller } from '@/Presentation/Contracts/Controller'
import {
  HttpRequest,
  Cookies,
  Headers,
  HttpResponse
} from '@/Presentation/Contracts/Http'
import { Validation } from '@/Presentation/Contracts/Validation'

export class CreateArticleController implements Controller {
  constructor(
    private readonly createArticleUseCase: CreateArticle,
    private readonly validation: Validation
  ) {}

  async handle(
    request: HttpRequest<CreateArticleParams>,
    cookies: Cookies,
    headers: Headers
  ): Promise<HttpResponse> {
    const data = this.validation.validate(request.body)
    const article = await this.createArticleUseCase.createArticle(data)
    return {
      status_code: 201,
      body: article
    }
  }
}
