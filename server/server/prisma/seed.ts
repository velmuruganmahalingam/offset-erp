import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword =
    await bcrypt.hash('1234', 10);

  await prisma.user.create({
    data: {
      username: 'admin',

      password: hashedPassword,

      name: 'Administrator',

      sections: ['admin'],
    },
  });

  console.log('Seed Completed');
}

main()
  .catch((e) => {
    console.error(e);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });