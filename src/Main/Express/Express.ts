import express from 'express'
import { errorHandlerMiddleware } from './ErrorHandlerMiddleware'
import { signUpRoutes } from '../Routes/Authentication/SignUp/SignUpRoute/SignUpRoute'

export const app = express()
app.use(express.json())
app.use(signUpRoutes)
app.use(errorHandlerMiddleware)
