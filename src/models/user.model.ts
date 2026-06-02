import { NotFoundError, ValidationError } from '../infra/errors.js';
import userRepository from '../repositories/user.repository.js';
import password from './password.model.js';

async function create(user: { email: string; password: string }) {
  const userFound = await findOne(user.email);

  if (userFound) {
    throw new ValidationError({
      message: 'User already exists',
      action: 'Use another email or try to login.',
    });
  }

  const hashed_password = await password.hashPassword(user.password);

  const newUser = await userRepository.create({
    email: user.email,
    password: hashed_password,
  });

  return newUser;
}

async function findOne(email: string) {
  const userFound = await userRepository.findOne(email);

  if (!userFound) {
    throw new NotFoundError({
      message: 'User not found',
      action: 'Check your credentials and try again.',
    });
  }

  return userFound;
}

const user = {
  findOne,
  create,
};

export default user;
