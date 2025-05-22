import {
  CreateArticleParams,
  CreateArticleResponse
} from '@/Domain/Articles/UseCases/CreateArticle'
import {
  UpdateArticleParams,
  UpdateArticleResponse
} from '@/Domain/Articles/UseCases/UpdateArticle'
import { Tspec } from 'tspec'

export type ArticleApiSpec = Tspec.DefineApiSpec<{
  basePath: '/api/articles'
  tags: ['Articles']
  paths: {
    '/': {
      post: {
        summary: 'Create a new article'
        body: CreateArticleParams
        responses: { 201: CreateArticleResponse }
      }
    }
    '/{id}': {
      put: {
        summary: 'Update an existing article'
        path: { id: number }
        body: Omit<UpdateArticleParams, 'id'>
        responses: { 200: UpdateArticleResponse }
      }
    }
  }
}>
