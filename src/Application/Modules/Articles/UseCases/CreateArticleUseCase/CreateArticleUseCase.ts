import { UserContext } from '@/Application/Contracts/Context/UserContext'
import { ArticleRepository } from '@/Application/Contracts/Repositories/ArticleRepository/ArticleRepository'
import {
  CreateArticle,
  CreateArticleParams,
  CreateArticleResponse
} from '@/Domain/Articles/UseCases/CreateArticle'

export class CreateArticleUseCase implements CreateArticle {
  constructor(
    private readonly userContext: UserContext,
    private readonly articleRepository: ArticleRepository
  ) {}

  async createArticle(
    params: CreateArticleParams
  ): Promise<CreateArticleResponse> {
    const user = this.userContext.getLoggedInUser()
    const article = await this.articleRepository.createArticle({
      body: params.body,
      status: 'ACTIVE',
      title: params.title,
      user_id: user.id
    })
    return article
  }
}
