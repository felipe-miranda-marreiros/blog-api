import { NextFunction, Response } from 'express'
import { nodeUserContextAdapter } from '@/Infrastructure/Context/NodeUserContextAdapter'
import { RequestWithUser } from '@/Main/Types/RequestWithUser'

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
