import type { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';

import { UnauthorizedError } from '../infra/errors.js';

export function middlewareValidateJWT(
  req: Request & { userInfo?: { name: string; email: string } },
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    throw new UnauthorizedError('Não autorizado.');
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (error, userInfo) => {
    if (error) throw new UnauthorizedError('Token inválido.');

    req.userInfo = userInfo as { name: string; email: string };
    next();
  });
}
