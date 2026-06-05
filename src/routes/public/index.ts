import { Router } from 'express';

import authRoutes from './auth.routes.js';
import statusRoutes from './status.routes.js';

const publicRoutes = Router();

publicRoutes.use(statusRoutes);
publicRoutes.use(authRoutes);

export default publicRoutes;
