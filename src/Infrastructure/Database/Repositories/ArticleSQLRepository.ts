import {
  ArticleRepository,
  CreateArticleParams
} from '@/Application/Contracts/Repositories/ArticleRepository/ArticleRepository'
import { Article } from '@/Domain/Articles/Models/Article'
import { db } from '../Drizzle/DrizzleClient'
import { articles } from '../Schemas/Schemas'
import { getISOFormatDateQuery } from '../Helpers/Helpers'

export class ArticleSQLRepository implements ArticleRepository {
  async createArticle(params: CreateArticleParams): Promise<Article> {
    const article = await db
      .insert(articles)
      .values({
        body: params.body,
        title: params.title,
        user_id: params.user_id,
        status: params.status
      })
      .returning({
        id: articles.id,
        title: articles.title,
        body: articles.body,
        user_id: articles.user_id,
        status: articles.status,
        created_at: getISOFormatDateQuery(articles.created_at),
        updated_at: getISOFormatDateQuery(articles.updated_at)
      })
    return article[0]
  }
}
