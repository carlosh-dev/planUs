import { prisma } from '../infra/database/prisma.js';

async function clearDatabase() {
  await prisma.transactionTag.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.plannedTransactionTag.deleteMany();
  await prisma.plannedTransaction.deleteMany();
  await prisma.family.deleteMany();
  await prisma.user.deleteMany();
}

async function getLoggedUser() {
  const response = await fetch(`${process.env.BASE_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'user@email.com',
      password: 'password123',
    }),
  });

  const body = (await response.json()) as {
    id: string;
    name: string;
    token: string;
  };

  return body;
}

const orchestrator = {
  clearDatabase,
  getToken: getLoggedUser,
};

export default orchestrator;
