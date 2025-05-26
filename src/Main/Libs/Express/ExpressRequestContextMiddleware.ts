import {
  baseLogger,
  requestContext
} from '@/Infrastructure/Logger/PinoLoggerAdapter'
import { NextFunction, Request, Response } from 'express'

export function expressRequestContextMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const child = baseLogger.child({ requestId: Date.now() })
  requestContext.run(new Map(), () => {
    requestContext.getStore()?.set('logger', child)
    next()
  })
}
