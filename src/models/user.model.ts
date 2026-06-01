import { prisma } from '../lib/prisma.js';
import password from './password.modal.js';

async function findOne(username: string) {
  return await prisma.user.findUnique({
    where: {
      email: username,
    },
  });
}

async function create(user: { email: string; password: string }) {
  const hashed_password = await password.hashPassword(user.password);
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      password: hashed_password,
    },
  });

  return newUser;
}

const user = {
  findOne,
  create,
};

export default user;
