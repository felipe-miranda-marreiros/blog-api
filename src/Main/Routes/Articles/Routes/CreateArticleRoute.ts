import { CreateArticleController } from '@/Presentation/Controllers/CreateArticleController/CreateArticleController'
import { CreateArticleUseCase } from '@/Application/Modules/Articles/UseCases/CreateArticleUseCase/CreateArticleUseCase'
import { ArticleSQLRepository } from '@/Infrastructure/Database/Repositories/ArticleSQLRepository'
import { nodeUserContextAdapter } from '@/Infrastructure/Context/NodeUserContextAdapter'
import { z } from 'zod'
import { CreateArticleParams } from '@/Domain/Articles/UseCases/CreateArticle'
import { ZodAdapter } from '@/Main/Libs/Zod/ZodAdapter'

const articleRepository = new ArticleSQLRepository()
const createArticleUseCase = new CreateArticleUseCase(
  nodeUserContextAdapter,
  articleRepository
)
const createArticleSchema = z.object({
  title: z.string().nonempty(),
  body: z.string().nonempty()
}) satisfies z.Schema<CreateArticleParams>

export const createArticleController = new CreateArticleController(
  createArticleUseCase,
  new ZodAdapter(createArticleSchema)
)
