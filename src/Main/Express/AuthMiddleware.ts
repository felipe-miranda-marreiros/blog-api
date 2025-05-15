import { NextFunction, Response } from 'express'
import { RequestWithUser } from '../Types/RequestWithUser'
import { nodeUserContextAdapter } from '@/Infrastructure/Context/NodeUserContextAdapter'

export function expressAuthenticationMiddleware(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  if (req.current_user) {
    nodeUserContextAdapter.setLoggedInUser(req.current_user, next)
  } else {
    res.status(401).json({})
  }
}
