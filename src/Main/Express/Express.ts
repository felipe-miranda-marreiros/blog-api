import express from 'express'
import { userRoutes } from '../Routes/Users/UserRoutes/CreateUserRoute'

export const app = express()
app.use(express.json())
app.use(userRoutes)
