import { CustomError } from '@/Application/Contracts/Errors/CustomError'
import { NextFunction, Request, Response } from 'express'

export function errorHandlerMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      errors: err.serializeErrors()
    })
    return
  }
  res.status(500).json(JSON.stringify(err))
  next()
}
