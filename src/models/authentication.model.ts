import jwt from 'jsonwebtoken';

import { UnauthorazedError } from '../infra/errors.js';
import passwordModel from './password.model.js';

const EXPIRATION_IN_MILLISECONDS = 60 * 60 * 24 * 30 * 1_000; // 30 days

async function createToken(user: { uuid: string }) {
  const secret = process.env.JWT_SECRET || 'secret';

  const token = jwt.sign({ user_id: user.uuid }, secret, {});

  return token;
}

async function validadePasword(
  providedPassword: string,
  storedPassword: string,
) {
  const correctPasswordMatch = await passwordModel.comparePassword(
    providedPassword,
    storedPassword,
  );

  if (!correctPasswordMatch) {
    throw new UnauthorazedError({
      message: 'Senha não confere.',
      action: 'Verifique se esse dado está correto.',
    });
  }
}

const authenticationModel = {
  createToken,
  validadePasword,
  EXPIRATION_IN_MILLISECONDS,
};

export default authenticationModel;
