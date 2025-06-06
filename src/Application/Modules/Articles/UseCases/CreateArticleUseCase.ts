import { UserContext } from '@/Application/Contracts/Context/UserContext'
import { ArticleRepository } from '@/Application/Contracts/Repositories/ArticleRepository'
import {
  CreateArticle,
  CreateArticleParams,
  CreateArticleResponse
} from '@/Domain/Articles/UseCases/CreateArticle'
import { logger } from '@/Infrastructure/Logger/PinoLoggerAdapter'

export class CreateArticleUseCase implements CreateArticle {
  constructor(
    private readonly userContext: UserContext,
    private readonly articleRepository: ArticleRepository
  ) {}

  async createArticle(
    params: CreateArticleParams
  ): Promise<CreateArticleResponse> {
    const user = this.userContext.getLoggedInUser()
    logger.info(`User (${user.id}) started creating an Article`)

    logger.info(`Trying to save article`, params)
    const article = await this.articleRepository.createArticle({
      body: params.body,
      status: 'ACTIVE',
      title: params.title,
      user_id: user.id
    })

    logger.info('Article was created successfully', article)
    return article
  }
}
