import { prisma } from '../infra/database/prisma.js';
import passwordModel from '../models/password.model.js';

async function findOne(email: string) {
  const userFound = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return userFound;
}

async function create(user: { email: string; password: string }) {
  const hashed_password = await passwordModel.hashPassword(user.password);
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      password: hashed_password,
    },
    omit: {
      password: true,
    },
  });

  return newUser;
}

const userRepository = {
  findOne,
  create,
};

export default userRepository;
