import { UserContext } from '@/Application/Contracts/Context/UserContext'
import { ConflictError } from '@/Application/Contracts/Errors/ConflictError'
import { NotFoundError } from '@/Application/Contracts/Errors/NotFoundError'
import { ArticleRepository } from '@/Application/Contracts/Repositories/ArticleRepository/ArticleRepository'
import {
  UpdateArticle,
  UpdateArticleParams,
  UpdateArticleResponse
} from '@/Domain/Articles/UseCases/UpdateArticle'
import { logger } from '@/Infrastructure/Logger/PinoLoggerAdapter'

export class UpdateArticleUseCase implements UpdateArticle {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly userContext: UserContext
  ) {}

  async updateArticle(
    params: UpdateArticleParams
  ): Promise<UpdateArticleResponse> {
    const user = this.userContext.getLoggedInUser()
    logger.info(`User (${user.id}) started updating an Article`)

    logger.info(`Getting Article by id (${params.id})`)
    const targetArticle = await this.articleRepository.getArticleById(params.id)

    if (!targetArticle) {
      logger.warn(`Article with id: ${params.id} not found`)
      throw new NotFoundError(`Article with id: ${params.id} not found`)
    }

    logger.info(
      `Checking if Article (${targetArticle.id}) belongs to user (${user.id})`
    )

    if (user.id !== targetArticle.user_id) {
      logger.warn(
        `User (${user.id}) don't have permission to update Article ${targetArticle.id}`
      )
      throw new ConflictError("You don't have permission to do this action")
    }

    logger.info(`Updating Article properties`, params)
    const updatedArticle = Object.assign(targetArticle, params)

    logger.info(`Saving updated Article properties`, updatedArticle)
    const article = await this.articleRepository.updateArticle(updatedArticle)

    logger.info(`Article was saved successfully`, article)
    return article
  }
}
