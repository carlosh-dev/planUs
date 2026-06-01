/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';

import type { BaseErrorType } from '../infra/errors.js';
import privateRoutes from './private/index.js';
import publicRoutes from './public/index.js';

const routes = Router();

const errorHandler = (
  err: Error & BaseErrorType,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    name: err.name,
    message: err.message || 'Internal Server Error',
    action: err.action,
    statusCode,
  });
};

const asyncErrorHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

routes.use(asyncErrorHandler(publicRoutes));
routes.use(asyncErrorHandler(privateRoutes));

routes.use(errorHandler);

export default routes;
