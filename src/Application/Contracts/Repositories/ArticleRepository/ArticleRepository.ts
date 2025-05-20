import { Article } from '@/Domain/Articles/Models/Article'

export type CreateArticleParams = Pick<
  Article,
  'body' | 'user_id' | 'status' | 'title'
>

export interface ArticleRepository {
  createArticle(params: CreateArticleParams): Promise<Article>
}
