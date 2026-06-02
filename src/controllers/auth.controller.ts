import type { Request, Response } from 'express';

import controller from '../infra/controller.js';
import user from '../models/user.model.js';

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;

  const newUser = await user.create({ email, password });

  return res.status(201).json({ user_id: newUser.uuid });
}

async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const createdUser = await user.login(email, password);

  controller.setSessionCookie(createdUser.token, res);

  return res.status(200).json({
    uuid: createdUser.uuid,
    email: createdUser.email,
    token: createdUser.token,
  });
}

const authController = {
  register,
  login,
};

export default authController;
