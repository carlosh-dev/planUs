import type { Request, Response } from 'express';

import { ValidationError } from '../infra/errors.js';
import user from '../models/user.model.js';

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;

  const userFound = await user.findOne(email);

  if (userFound) {
    throw new ValidationError({
      message: 'User already exists',
      action: 'Use another email or try to login.',
    });
  }

  const newUser = await user.create({ email, password });

  return res.status(201).json({ user_id: newUser.id });
}

async function login(req: Request, res: Response) {
  const { username } = req.body;

  const userFound = await user.findOne(username);

  if (!userFound) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json({ message: 'Login successful' });
}

const authController = {
  register,
  login,
};

export default authController;
