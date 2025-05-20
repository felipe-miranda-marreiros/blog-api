import { UserContext } from '@/Application/Contracts/Context/UserContext'
import { ConflictError } from '@/Application/Contracts/Errors/ConflictError'
import { NotFoundError } from '@/Application/Contracts/Errors/NotFoundError'
import { ArticleRepository } from '@/Application/Contracts/Repositories/ArticleRepository/ArticleRepository'
import { Article } from '@/Domain/Articles/Models/Article'
import {
  UpdateArticle,
  UpdateArticleParams
} from '@/Domain/Articles/UseCases/UpdateArticle'

export class UpdateArticleUseCase implements UpdateArticle {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly userContext: UserContext
  ) {}

  async updateArticle(params: UpdateArticleParams): Promise<Article> {
    const user = this.userContext.getLoggedInUser()

    const targetArticle = await this.articleRepository.getArticleById(params.id)

    if (!targetArticle) {
      throw new NotFoundError(`Article with id: ${params.id} not found`)
    }

    if (user.id !== targetArticle.user_id) {
      throw new ConflictError("You don't have permission to do this action")
    }

    const updatedArticle = Object.assign(targetArticle, params)

    const article = await this.articleRepository.updateArticle(updatedArticle)

    return article
  }
}
