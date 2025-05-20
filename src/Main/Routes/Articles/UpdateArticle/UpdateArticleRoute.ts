import { expressAuthenticationMiddleware } from '@/Main/Express/AuthMiddleware'
import { expressMiddlewareAdapter } from '@/Main/Express/ExpressMiddlewareAdapter'
import { Router } from 'express'
import { authenticationMiddleware } from '../../Users/CurrentUser/CurrentUserRoute'
import { expressControllerAdapter } from '@/Main/Express/ExpressControllerAdapter'
import { ArticleSQLRepository } from '@/Infrastructure/Database/Repositories/ArticleSQLRepository'
import { nodeUserContextAdapter } from '@/Infrastructure/Context/NodeUserContextAdapter'
import { z } from 'zod'
import { ZodAdapter } from '@/Main/Zod/ZodAdapter'
import { UpdateArticleController } from '@/Presentation/Controllers/UpdateArticleController/UpdateArticleController'
import { UpdateArticleUseCase } from '@/Application/Modules/Articles/UseCases/UpdateArticleUseCase/UpdateArticleUseCase'

export const updateArticleRouter = Router()

const articleRepository = new ArticleSQLRepository()
const updateArticleUseCase = new UpdateArticleUseCase(
  articleRepository,
  nodeUserContextAdapter
)

const updateArticleSchema = z.object({
  id: z.string().transform((value) => parseInt(value)),
  title: z.string().nonempty(),
  body: z.string().nonempty()
})

const updateArticleController = new UpdateArticleController(
  updateArticleUseCase,
  new ZodAdapter(updateArticleSchema)
)

updateArticleRouter.use(expressMiddlewareAdapter(authenticationMiddleware))
updateArticleRouter.use(expressAuthenticationMiddleware)

updateArticleRouter.put(
  '/api/articles/:id',
  expressControllerAdapter(updateArticleController)
)
