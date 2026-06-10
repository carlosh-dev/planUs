import { Router } from 'express';

import {
  asyncRouteErrorHandler,
  errorsMiddleware,
} from '../middlewares/errors.middleware.js';
import privateRoutes from './private/index.js';
import publicRoutes from './public/index.js';

const routes = Router();

routes.use(
  '/api',
  asyncRouteErrorHandler(publicRoutes),
  asyncRouteErrorHandler(privateRoutes),
);

routes.use(errorsMiddleware);

export default routes;
