import {
  ArticleRepository,
  CreateArticleParams,
  UpdateArticleParams
} from '@/Application/Contracts/Repositories/ArticleRepository/ArticleRepository'
import { Article } from '@/Domain/Articles/Models/Article'
import { db } from '../Drizzle/DrizzleClient'
import { articles } from '../Schemas/Schemas'
import { getISOFormatDateQuery } from '../Helpers/Helpers'
import { eq } from 'drizzle-orm'

export class ArticleSQLRepository implements ArticleRepository {
  async updateArticle(params: UpdateArticleParams): Promise<Article> {
    const article = await db
      .update(articles)
      .set({
        body: params.body,
        title: params.title
      })
      .where(eq(articles.id, params.id))
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

  async getArticleById(id: number): Promise<Article | undefined> {
    const article = await db.select().from(articles).where(eq(articles.id, id))
    return article[0]
      ? {
          ...article[0],
          created_at: article[0].created_at.toISOString(),
          updated_at: article[0].updated_at.toISOString()
        }
      : undefined
  }

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
