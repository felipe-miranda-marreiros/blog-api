import {
  ArticleRepository,
  ArticlePersistence
} from '@/Application/Contracts/Repositories/ArticleRepository'
import { Article } from '@/Domain/Articles/Models/Article'
import { db } from '../Drizzle/DrizzleClient'
import { articles_table } from '../Schemas/Schemas'
import { getISOFormatDateQuery } from '../Helpers/Helpers'
import { eq } from 'drizzle-orm'

export class ArticleSQLRepository implements ArticleRepository {
  async updateArticle(
    params: ArticlePersistence.UpdateArticle
  ): Promise<Article> {
    const article = await db
      .update(articles_table)
      .set({
        body: params.body,
        title: params.title
      })
      .where(eq(articles_table.id, params.id))
      .returning({
        id: articles_table.id,
        title: articles_table.title,
        body: articles_table.body,
        user_id: articles_table.user_id,
        status: articles_table.status,
        created_at: getISOFormatDateQuery(articles_table.created_at),
        updated_at: getISOFormatDateQuery(articles_table.updated_at)
      })
    return article[0]
  }

  async getArticleById(id: number): Promise<Article | undefined> {
    const article = await db
      .select()
      .from(articles_table)
      .where(eq(articles_table.id, id))
    return article[0]
      ? {
          ...article[0],
          created_at: article[0].created_at.toISOString(),
          updated_at: article[0].updated_at.toISOString()
        }
      : undefined
  }

  async createArticle(
    params: ArticlePersistence.CreateArticle
  ): Promise<Article> {
    const article = await db
      .insert(articles_table)
      .values({
        body: params.body,
        title: params.title,
        user_id: params.user_id,
        status: params.status
      })
      .returning({
        id: articles_table.id,
        title: articles_table.title,
        body: articles_table.body,
        user_id: articles_table.user_id,
        status: articles_table.status,
        created_at: getISOFormatDateQuery(articles_table.created_at),
        updated_at: getISOFormatDateQuery(articles_table.updated_at)
      })
    return article[0]
  }
}
