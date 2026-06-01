import type { Request, Response } from 'express';

import user from '../models/user.model.js';

async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  const userFound = await user.findOne(username);

  if (!userFound || userFound.password !== password) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json({ message: 'Login successful' });
}

export async function signup(req: Request, res: Response) {
  const { username, password } = req.body;

  const userFound = await user.findOne(username);

  if (userFound) {
    return res.status(400).json({ message: 'User already exists' });
  }

  await user.create({ username, password });

  return res.status(201).json({ message: 'User created successfully' });
}

const authController = {
  login,
  signup,
};

export default authController;
