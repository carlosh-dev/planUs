import { prisma } from '../infra/database/prisma.js';

async function clearDatabase() {
  await prisma.user.deleteMany();
  await prisma.family.deleteMany();
}

const orchestrator = {
  clearDatabase,
};

export default orchestrator;
