import type { Request, Response } from 'express';

import user from '../models/user.model.js';

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;

  const newUser = await user.create({ email, password });

  return res.status(201).json({ user_id: newUser.uuid });
}

async function login(req: Request, res: Response) {
  const { email } = req.body;

  await user.findOne(email);

  return res.status(200).json({ message: 'Login successful' });
}

const authController = {
  register,
  login,
};

export default authController;
