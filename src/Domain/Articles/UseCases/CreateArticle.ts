import { Article } from '../Models/Article'

export type CreateArticleParams = Pick<Article, 'body' | 'title'>

export type CreateArticleResponse = Article

export interface CreateArticle {
  createArticle(params: CreateArticleParams): Promise<CreateArticleResponse>
}
