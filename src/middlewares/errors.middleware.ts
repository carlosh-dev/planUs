/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import type { Request, Response, NextFunction } from 'express';

import type { BaseErrorType } from '../infra/errors.js';

export const errorsMiddleware = (
  err: Error & Partial<BaseErrorType>,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  console.log(err);
  return res.status(statusCode).json({
    name: err.name,
    message: err.message || 'Internal Server Error',
    action: err.action,
    details: err.details,
    statusCode,
  });
};

export const asyncErrorHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
