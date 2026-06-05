import { Router } from 'express';

import {
  asyncErrorHandler,
  errorsMiddleware,
} from '../middlewares/errors.middleware.js';
import privateRoutes from './private/index.js';
import publicRoutes from './public/index.js';

const routes = Router();

routes.use(
  '/api',
  asyncErrorHandler(publicRoutes),
  asyncErrorHandler(privateRoutes),
);

routes.use(errorsMiddleware);

export default routes;
