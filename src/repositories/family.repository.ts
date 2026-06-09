import { prisma } from '../infra/database/prisma.js';
import { NotFoundError } from '../infra/errors.js';
import type { createFamilyType } from '../schemas/family.schema.js';

async function create({ name, users }: createFamilyType) {
  const newFamily = await prisma.family.create({
    data: {
      name,
      users: {
        connect: users.map((id) => ({ id })),
      },
    },
  });

  return newFamily;
}

async function list(userId: string) {
  const results = await prisma.family.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
  });

  if (!results || results.length == 0) {
    throw new NotFoundError({
      message: 'Nenhuma familia encontrada.',
      action: 'Cadastre uma família para este usuário.',
    });
  }

  return results;
}

const familyRepository = {
  create,
  list,
};

export default familyRepository;
