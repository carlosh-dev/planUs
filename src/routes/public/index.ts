import { Router } from 'express';

import authRoutes from './auth.routes.js';

const publicRoutes = Router();

publicRoutes.use('/auth', authRoutes);

export default publicRoutes;
