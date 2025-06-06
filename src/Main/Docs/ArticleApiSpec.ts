import {
  CreateArticleParams,
  CreateArticleResponse
} from '@/Domain/Articles/UseCases/CreateArticle'
import {
  UpdateArticleParams as DomainUpdateArticleParams,
  UpdateArticleResponse
} from '@/Domain/Articles/UseCases/UpdateArticle'
import { Tspec } from 'tspec'

type UpdateArticleParams = Omit<DomainUpdateArticleParams, 'id'>

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
        body: UpdateArticleParams
        responses: { 200: UpdateArticleResponse }
      }
    }
  }
}>
