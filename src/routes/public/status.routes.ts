import { Router } from 'express';

const statusRoutes = Router();

statusRoutes.get('/status', (req, res) => {
  res.json({ status: 'ok' });
});

export default statusRoutes;
