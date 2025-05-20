import { Article } from '../Models/Article'

export type CreateArticleParams = Pick<Article, 'body' | 'title'>

export interface CreateArticle {
  createArticle(params: CreateArticleParams): Promise<Article>
}
