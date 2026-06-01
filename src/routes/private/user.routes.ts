import { Router } from 'express';

import { middlewareValidateJWT } from '../../middlewares/validateJWT.js';

const userRoutes = Router();

userRoutes.use(middlewareValidateJWT);

userRoutes.get('/', (req, res) => {
  res.json({ message: 'This is the user route' });
});

userRoutes.post('/', (req, res) => {
  res.json({ message: 'This is the user route' });
});

export default userRoutes;
