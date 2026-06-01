import { Router } from 'express';

import { middlewareValidateJWT } from '../../middlewares/validateJWT.js';
import userRoutes from './user.routes.js';

const privateRoutes = Router();

privateRoutes.use(middlewareValidateJWT);
privateRoutes.use('/user', userRoutes);

export default privateRoutes;
