import { Router } from 'express';

import {
  asyncErrorHandler,
  errorsMiddleware,
} from '../middlewares/errorsMiddleware.js';
import privateRoutes from './private/index.js';
import publicRoutes from './public/index.js';

const routes = Router();

routes.use(asyncErrorHandler(publicRoutes));
routes.use(asyncErrorHandler(privateRoutes));

routes.use(errorsMiddleware);

export default routes;
