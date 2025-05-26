import express from 'express'
import { errorHandlerMiddleware } from './ErrorHandlerMiddleware'
import cookieParser from 'cookie-parser'
import { signUpRoutes } from '@/Main/Routes/Authentication/SignUp/SignUpRoute/SignUpRoute'
import { signInRouter } from '@/Main/Routes/Authentication/SignIn/SignInRoute/SignInRoute'
import { userRoutes } from '@/Main/Routes/Users/CurrentUser/CurrentUserRoute'
import { createArticleRouter } from '@/Main/Routes/Articles/CreateArticle/CreateArticleRoute'
import { updateArticleRouter } from '@/Main/Routes/Articles/UpdateArticle/UpdateArticleRoute'
import { expressRequestContextMiddleware } from './ExpressRequestContextMiddleware'

export const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(expressRequestContextMiddleware)
app.use(signUpRoutes)
app.use(signInRouter)
app.use(userRoutes)
app.use(createArticleRouter)
app.use(updateArticleRouter)
app.use(errorHandlerMiddleware)
