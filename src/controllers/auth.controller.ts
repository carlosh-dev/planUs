import type { Request, Response } from 'express';

import controller from '../infra/controller.js';
import user from '../models/user.model.js';
import type {
  UserLoginType,
  UserRegistratioType,
} from '../schemas/user.schema.js';

export async function register(
  req: Request<unknown, unknown, UserRegistratioType>,
  res: Response,
) {
  const { name, email, password } = req.body;

  const newUser = await user.create({ name, email, password });

  return res.status(201).json({ id: newUser.id });
}

async function login(
  req: Request<unknown, unknown, UserLoginType>,
  res: Response,
) {
  const { email, password } = req.body;

  const createdUser = await user.login({ email, password });

  controller.setSessionCookie(createdUser.token, res);

  return res.status(200).json({
    id: createdUser.id,
    email: createdUser.email,
    token: createdUser.token,
  });
}

const authController = {
  register,
  login,
};

export default authController;
