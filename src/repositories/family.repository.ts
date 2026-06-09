import { prisma } from '../infra/database/prisma.js';
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

const familyRepository = {
  create,
};

export default familyRepository;
