import passwordModel from '../../models/password.model.js';
import { Role } from '../constants/enums.js';
import { prisma } from './prisma.js';

async function main() {
  const firstUser = prisma.user.upsert({
    where: { email: 'user@email.com' },
    update: {},
    create: {},
  });

  console.log(firstUser);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
