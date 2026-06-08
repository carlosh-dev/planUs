import { prisma } from '../infra/database/prisma.js';
import passwordModel from '../models/password.model.js';
import type { UserRegistratioType } from '../schemas/user.schema.js';

async function findOne(email: string) {
  const userFound = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return userFound;
}

async function create({ name, email, password }: UserRegistratioType) {
  const hashed_password = await passwordModel.hashPassword(password);
  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
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
