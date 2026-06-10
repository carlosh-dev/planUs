import jwt from 'jsonwebtoken';

import type { Role } from '../infra/database/generated/prisma/enums.js';
import { UnauthorizedError } from '../infra/errors.js';
import passwordModel from './password.model.js';

const EXPIRATION_IN_MILLISECONDS = 60 * 60 * 24 * 30 * 1_000; // 30 days

async function createToken(user: { id: string; role: Role }) {
  const secret = process.env.JWT_SECRET || 'secret';

  const token = jwt.sign({ user_id: user.id, role: user.role }, secret, {
    expiresIn: EXPIRATION_IN_MILLISECONDS,
  });

  return token;
}

async function validatePassword(
  providedPassword: string,
  storedPassword: string,
) {
  const correctPasswordMatch = await passwordModel.comparePassword(
    providedPassword,
    storedPassword,
  );

  if (!correctPasswordMatch) {
    throw new UnauthorizedError('Senha incorreta.');
  }
}

const authenticationModel = {
  createToken,
  validatePassword,
  EXPIRATION_IN_MILLISECONDS,
};

export default authenticationModel;
