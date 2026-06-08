import { NotFoundError, ValidationError } from '../infra/errors.js';
import userRepository from '../repositories/user.repository.js';
import type {
  UserLoginType,
  UserRegistratioType,
} from '../schemas/user.schema.js';
import authenticationModel from './authentication.model.js';

async function create(user: UserRegistratioType) {
  const userFound = await userRepository.findOne(user.email);

  if (userFound) {
    throw new ValidationError({
      message: 'User already exists',
      action: 'Use another email or try to login.',
    });
  }

  const newUser = await userRepository.create({
    name: user.name,
    email: user.email,
    password: user.password,
  });

  return newUser;
}

async function login({ email, password }: UserLoginType) {
  const userFound = await userRepository.findOne(email);

  if (!userFound) {
    throw new NotFoundError({
      message: 'User not found',
      action: 'Check your credentials and try again.',
    });
  }

  await authenticationModel.validadePasword(password, userFound.password);

  const token = await authenticationModel.createToken({
    id: userFound.id,
    role: userFound.role,
  });

  return { id: userFound.id, email: userFound.email, token };
}

const user = {
  create,
  login,
};

export default user;
