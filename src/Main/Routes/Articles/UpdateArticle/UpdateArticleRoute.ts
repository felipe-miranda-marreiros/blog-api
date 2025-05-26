import { Router } from 'express'
import { authenticationMiddleware } from '../../Users/CurrentUser/CurrentUserRoute'
import { ArticleSQLRepository } from '@/Infrastructure/Database/Repositories/ArticleSQLRepository'
import { nodeUserContextAdapter } from '@/Infrastructure/Context/NodeUserContextAdapter'
import { z } from 'zod'
import { ZodAdapter } from '@/Main/Libs/Zod/ZodAdapter'
import { UpdateArticleController } from '@/Presentation/Controllers/UpdateArticleController/UpdateArticleController'
import { UpdateArticleUseCase } from '@/Application/Modules/Articles/UseCases/UpdateArticleUseCase/UpdateArticleUseCase'
import { expressMiddlewareAdapter } from '@/Main/Libs/Express/ExpressMiddlewareAdapter'
import { expressAuthenticationMiddleware } from '@/Main/Libs/Express/AuthMiddleware'
import { expressControllerAdapter } from '@/Main/Libs/Express/ExpressControllerAdapter'

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
