import { Router } from 'express';

import familyController from '../../controllers/family.controller.js';
import { validateData } from '../../middlewares/schemaValidation.middleware.js';
import { createFamilySchema } from '../../schemas/family.schema.js';

const familyRoute = Router();

familyRoute.post(
  '/',
  validateData(createFamilySchema),
  familyController.create,
);

familyRoute.get('/:user_id', familyController.list);

export default familyRoute;
