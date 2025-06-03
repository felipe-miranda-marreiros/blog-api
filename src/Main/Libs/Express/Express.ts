import express from 'express'
import { errorHandlerMiddleware } from './ErrorHandlerMiddleware'
import cookieParser from 'cookie-parser'
import { authenticationMiddleware } from '@/Main/Routes/Users/Routes/CurrentUserRoute'
import { expressRequestContextMiddleware } from './ExpressRequestContextMiddleware'
import { expressMiddlewareAdapter } from './ExpressMiddlewareAdapter'
import { expressAuthenticationMiddleware } from './AuthMiddleware'
import { authenticationRouter } from '@/Main/Routes/Authentication'
import { userRouter } from '@/Main/Routes/Users'
import { articleRouter } from '@/Main/Routes/Articles'
import { swaggerRouter } from '@/Main/Routes/Swagger/SwggerRouter'

export const app = express()

app.use(expressRequestContextMiddleware)
app.use(cookieParser())
app.use(express.json())

// Public Routes
app.use(swaggerRouter)
app.use(authenticationRouter)

// Protected Routes
app.use(expressMiddlewareAdapter(authenticationMiddleware))
app.use(expressAuthenticationMiddleware)
app.use(userRouter)
app.use(articleRouter)

// Global Error Handler
app.use(errorHandlerMiddleware)
