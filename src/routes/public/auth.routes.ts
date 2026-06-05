/* eslint-disable import/no-named-as-default-member */
import { Router } from 'express';

import authController from '../../controllers/auth.controller.js';
import { validateData } from '../../middlewares/schemaValidation.middleware.js';
import {
  userLoginSchema,
  userRegistrationSchema,
} from '../../schemas/user.schema.js';

const authRoutes = Router();

authRoutes.post('/login', validateData(userLoginSchema), authController.login);

authRoutes.post(
  '/register',
  validateData(userRegistrationSchema),
  authController.register,
);

export default authRoutes;
