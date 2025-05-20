import { expressAuthenticationMiddleware } from '@/Main/Express/AuthMiddleware'
import { expressMiddlewareAdapter } from '@/Main/Express/ExpressMiddlewareAdapter'
import { Router } from 'express'
import { authenticationMiddleware } from '../../Users/CurrentUser/CurrentUserRoute'
import { expressControllerAdapter } from '@/Main/Express/ExpressControllerAdapter'
import { CreateArticleController } from '@/Presentation/Controllers/CreateArticleController/CreateArticleController'
import { CreateArticleUseCase } from '@/Application/Modules/Articles/UseCases/CreateArticleUseCase/CreateArticleUseCase'
import { ArticleSQLRepository } from '@/Infrastructure/Database/Repositories/ArticleSQLRepository'
import { nodeUserContextAdapter } from '@/Infrastructure/Context/NodeUserContextAdapter'
import { z } from 'zod'
import { CreateArticleParams } from '@/Domain/Articles/UseCases/CreateArticle'
import { ZodAdapter } from '@/Main/Zod/ZodAdapter'

export const createArticleRouter = Router()

const articleRepository = new ArticleSQLRepository()
const createArticleUseCase = new CreateArticleUseCase(
  nodeUserContextAdapter,
  articleRepository
)
const createArticleSchema = z.object({
  title: z.string().nonempty(),
  body: z.string().nonempty()
}) satisfies z.Schema<CreateArticleParams>

const createArticleController = new CreateArticleController(
  createArticleUseCase,
  new ZodAdapter(createArticleSchema)
)

createArticleRouter.use(expressMiddlewareAdapter(authenticationMiddleware))
createArticleRouter.use(expressAuthenticationMiddleware)

createArticleRouter.post(
  '/api/articles',
  expressControllerAdapter(createArticleController)
)
