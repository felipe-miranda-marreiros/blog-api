import { expressControllerAdapter } from '@/Main/Libs/Express/ExpressControllerAdapter'
import { Router } from 'express'
import { createArticleController } from './Routes/CreateArticleRoute'
import { updateArticleController } from './Routes/UpdateArticleRoute'

export const articleRouter = Router()

articleRouter.post(
  '/api/articles',
  expressControllerAdapter(createArticleController)
)

articleRouter.put(
  '/api/articles/:id',
  expressControllerAdapter(updateArticleController)
)
