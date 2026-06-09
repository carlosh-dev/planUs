import type { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';

export function middlewareValidateJWT(
  req: Request & { userInfo?: { name: string; email: string } },
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (error, userInfo) => {
    if (error) return res.status(403).json({ message: 'Forbidden' });

    req.userInfo = userInfo as { name: string; email: string };
    next();
  });
}
