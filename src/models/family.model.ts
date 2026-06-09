import familyRepository from '../repositories/family.repository.js';
import type { createFamilyType } from '../schemas/family.schema.js';

async function create({ name, users }: createFamilyType) {
  const newFamily = await familyRepository.create({
    name: name,
    users: users,
  });

  return newFamily;
}

const familyModel = {
  create,
};

export default familyModel;
