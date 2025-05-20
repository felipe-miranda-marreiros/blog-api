import { Article } from '../Models/Article'

export type UpdateArticleParams = Pick<Article, 'body' | 'title' | 'id'>

export interface UpdateArticle {
  updateArticle(params: UpdateArticleParams): Promise<Article>
}
