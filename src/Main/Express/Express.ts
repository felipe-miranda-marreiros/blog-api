import express from 'express'
import { errorHandlerMiddleware } from './ErrorHandlerMiddleware'
import { signUpRoutes } from '../Routes/Authentication/SignUp/SignUpRoute/SignUpRoute'
import { signInRouter } from '../Routes/Authentication/SignIn/SignInRoute/SignInRoute'
import cookieParser from 'cookie-parser'
import { userRoutes } from '../Routes/Users/CurrentUser/CurrentUserRoute'

export const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(signUpRoutes)
app.use(signInRouter)
app.use(userRoutes)
app.use(errorHandlerMiddleware)
