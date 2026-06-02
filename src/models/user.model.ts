import { NotFoundError, ValidationError } from '../infra/errors.js';
import userRepository from '../repositories/user.repository.js';
import authenticationModel from './authentication.model.js';

async function create(user: { email: string; password: string }) {
  const userFound = await userRepository.findOne(user.email);

  if (userFound) {
    throw new ValidationError({
      message: 'User already exists',
      action: 'Use another email or try to login.',
    });
  }

  const newUser = await userRepository.create({
    email: user.email,
    password: user.password,
  });

  return newUser;
}

async function login(email: string, password: string) {
  const userFound = await userRepository.findOne(email);

  if (!userFound) {
    throw new NotFoundError({
      message: 'User not found',
      action: 'Check your credentials and try again.',
    });
  }

  await authenticationModel.validadePasword(password, userFound.password);

  const token = await authenticationModel.createToken({ uuid: userFound.uuid });

  return { uuid: userFound.uuid, email: userFound.email, token };
}

const user = {
  create,
  login,
};

export default user;
