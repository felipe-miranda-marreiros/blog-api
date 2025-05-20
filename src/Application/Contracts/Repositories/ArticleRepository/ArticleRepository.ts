import { Article } from '@/Domain/Articles/Models/Article'

export type CreateArticleParams = Pick<
  Article,
  'body' | 'user_id' | 'status' | 'title'
>

export type UpdateArticleParams = Pick<
  Article,
  'body' | 'user_id' | 'title' | 'id'
>

export interface ArticleRepository {
  createArticle(params: CreateArticleParams): Promise<Article>
  updateArticle(params: UpdateArticleParams): Promise<Article>
  getArticleById(id: number): Promise<Article | undefined>
}
