import { ArticleSQLRepository } from '@/Infrastructure/Database/Repositories/ArticleSQLRepository'
import { nodeUserContextAdapter } from '@/Infrastructure/Context/NodeUserContextAdapter'
import { z } from 'zod'
import { ZodAdapter } from '@/Main/Libs/Zod/ZodAdapter'
import { UpdateArticleController } from '@/Presentation/Controllers/UpdateArticleController/UpdateArticleController'
import { UpdateArticleUseCase } from '@/Application/Modules/Articles/UseCases/UpdateArticleUseCase/UpdateArticleUseCase'

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

export const updateArticleController = new UpdateArticleController(
  updateArticleUseCase,
  new ZodAdapter(updateArticleSchema)
)
