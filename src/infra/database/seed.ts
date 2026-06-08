import passwordModel from '../../models/password.model.js';
import { prisma } from './prisma.js';

const FAMILY_ID = 'fe6a37ee-a70c-4c43-b897-a3fb929fe1b4';

async function main() {
  const family = await prisma.family.upsert({
    where: { id: FAMILY_ID },
    update: {},
    create: { id: FAMILY_ID, name: 'Família Silva' },
  });

  const normalPassword = await passwordModel.hashPassword('password123');
  const adminPassword = await passwordModel.hashPassword('admin123');

  const normalUser = await prisma.user.upsert({
    where: { email: 'user@email.com' },
    update: { familyId: family.id },
    create: {
      email: 'user@email.com',
      name: 'Normal User',
      password: normalPassword,
      role: 'USER',
      salary: 5000,
      familyId: family.id,
    },
  });

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@email.com' },
    update: { familyId: family.id },
    create: {
      email: 'admin@email.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
      salary: 10000,
      familyId: family.id,
    },
  });

  const tagNames = ['Alimentação', 'Transport', 'Casa'];
  const tags = await Promise.all(
    tagNames.map((name) =>
      prisma.tag.upsert({
        where: { userId_name: { userId: normalUser.id, name } },
        update: {},
        create: { name, userId: normalUser.id },
      }),
    ),
  );

  const transaction = await prisma.transaction.upsert({
    where: { description: 'Compras do mês no mercado' },
    update: {},
    create: {
      name: 'Mercado',
      description: 'Compras do mês no mercado',
      value: 35000,
      userId: normalUser.id,
      payment_date: new Date(),
      type: 'OUT',
      transactionTags: {
        create: { tagId: tags[0]!.id },
      },
    },
  });

  console.log({
    family: family.id,
    users: { normal: normalUser.id, admin: adminUser.id },
    tags: tags.map((tag) => tag.id),
    transaction: transaction.id,
  });
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
