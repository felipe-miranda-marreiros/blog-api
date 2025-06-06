import { Article } from '@/Domain/Articles/Models/Article'

export interface ArticleRepository {
  createArticle(params: ArticlePersistence.CreateArticle): Promise<Article>
  updateArticle(params: ArticlePersistence.UpdateArticle): Promise<Article>
  getArticleById(id: number): Promise<Article | undefined>
}

export namespace ArticlePersistence {
  export type CreateArticle = Pick<
    Article,
    'body' | 'user_id' | 'status' | 'title'
  >

  export type UpdateArticle = Pick<Article, 'body' | 'user_id' | 'title' | 'id'>
}
