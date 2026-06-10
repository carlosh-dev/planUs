/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import type { Request, Response, NextFunction } from 'express';

import type { BaseError } from '../infra/errors.js';

export const errorsMiddleware = (
  err: Error & Partial<BaseError>,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  console.error(err);
  return res.status(statusCode).json({
    name: err.name,
    message: err.message || 'Internal Server Error',
    statusCode,
  });
};

export const asyncRouteErrorHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
