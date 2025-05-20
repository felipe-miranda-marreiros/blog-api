import { BadRequestError } from '@/Application/Contracts/Errors/BadRequestError'
import {
  UpdateArticle,
  UpdateArticleParams
} from '@/Domain/Articles/UseCases/UpdateArticle'
import { Controller } from '@/Presentation/Contracts/Controller'
import {
  HttpRequest,
  Cookies,
  Headers,
  HttpResponse,
  Params
} from '@/Presentation/Contracts/Http'
import { Validation } from '@/Presentation/Contracts/Validation'

export class UpdateArticleController implements Controller {
  constructor(
    private readonly updateArticleUseCase: UpdateArticle,
    private readonly validation: Validation
  ) {}

  async handle(
    request: HttpRequest<Omit<UpdateArticleParams, 'id'>>,
    cookies: Cookies,
    headers: Headers,
    params: Params<Pick<UpdateArticleParams, 'id'>>
  ): Promise<HttpResponse> {
    if (!params.data.id) {
      throw new BadRequestError('Article id is required to complete operation')
    }
    const data = this.validation.validate<UpdateArticleParams>({
      body: request.body.body,
      id: params.data.id,
      title: request.body.title
    })
    const article = await this.updateArticleUseCase.updateArticle(data)
    return {
      status_code: 200,
      body: article
    }
  }
}
