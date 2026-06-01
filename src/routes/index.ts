import { Router } from 'express';

import privateRoutes from './private/index.js';
import publicRoutes from './public/index.js';

const routes = Router();

routes.use(publicRoutes);
routes.use(privateRoutes);

export default routes;
