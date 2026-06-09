import { Router } from 'express';

import { middlewareValidateJWT } from '../../middlewares/jwt.middleware.js';
import familyRoute from './famiily.routes.js';

const privateRoutes = Router();

privateRoutes.use(middlewareValidateJWT);
privateRoutes.use('/family', familyRoute);

export default privateRoutes;
