import { Article } from '../Models/Article'

export type UpdateArticleParams = Pick<Article, 'body' | 'title' | 'id'>

export type UpdateArticleResponse = Article

export interface UpdateArticle {
  updateArticle(params: UpdateArticleParams): Promise<UpdateArticleResponse>
}
