import express from 'express'
import { userRoutes } from '../Routes/SignUp/SignUpRoute/SignUpRoute'
import { errorHandlerMiddleware } from './ErrorHandlerMiddleware'

export const app = express()
app.use(express.json())
app.use(userRoutes)
app.use(errorHandlerMiddleware)
