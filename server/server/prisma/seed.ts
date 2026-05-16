import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {

  /*
    ADMIN USER
  */

  const hashedPassword =
    await bcrypt.hash('1234', 10);

  await prisma.user.upsert({
    where: { username: 'admin', },
    update: {},
    create: {
      username: 'admin',

      password: hashedPassword,

      name: 'Administrator',

      sections: ['admin'],
    },
  });

  /*
    PAPER TYPES
  */
  const paperData = [
    {
      size: '5.5*17',
      options: [
        { gsm: 100, type: 'Art' },
        { gsm: 130, type: 'Art' },
        { gsm: 170, type: 'Art' },
        { gsm: 210, type: 'Art' },
        { gsm: 220, type: 'Art' },
        { gsm: 250, type: 'Art' },
        { gsm: 300, type: 'Art' },
        { gsm: 70, type: 'Litho' },
        { gsm: 80, type: 'Litho' },
      ],
    },

    {
      size: '7*19',
      options: [
        { gsm: 100, type: 'Art' },
        { gsm: 130, type: 'Art' },
        { gsm: 170, type: 'Art' },
        { gsm: 210, type: 'Art' },
        { gsm: 220, type: 'Art' },
        { gsm: 250, type: 'Art' },
        { gsm: 300, type: 'Art' },
        { gsm: 70, type: 'Litho' },
        { gsm: 80, type: 'Litho' },
      ],
    },

    {
      size: '8.5*5',
      options: [
        { gsm: 100, type: 'Art' },
        { gsm: 130, type: 'Art' },
        { gsm: 170, type: 'Art' },
        { gsm: 220, type: 'Art' },
        { gsm: 300, type: 'Art' },
      ],
    },

    {
      size: '8.5*17',
      options: [
        { gsm: 100, type: 'Art' },
        { gsm: 130, type: 'Art' },
        { gsm: 170, type: 'Art' },
        { gsm: 210, type: 'Art' },
        { gsm: 220, type: 'Art' },
        { gsm: 250, type: 'Art' },
        { gsm: 300, type: 'Art' },
        { gsm: 70, type: 'Litho' },
        { gsm: 80, type: 'Litho' },
      ],
    },

    {
      size: '8.5*24',
      options: [
        { gsm: 100, type: 'Art' },
        { gsm: 130, type: 'Art' },
        { gsm: 170, type: 'Art' },
        { gsm: 220, type: 'Art' },
        { gsm: 300, type: 'Art' },
        { gsm: 70, type: 'Maplitho' },
      ],
    },

    {
      size: '9.5*7',
      options: [
        { gsm: 100, type: 'Art' },
        { gsm: 130, type: 'Art' },
        { gsm: 170, type: 'Art' },
        { gsm: 210, type: 'Art' },
        { gsm: 220, type: 'Art' },
        { gsm: 250, type: 'Art' },
        { gsm: 300, type: 'Art' },
        { gsm: 70, type: 'Litho' },
        { gsm: 80, type: 'Litho' },
      ],
    },

    {
      size: '9.25*18.5',
      options: [
        { gsm: 100, type: 'Art' },
        { gsm: 130, type: 'Art' },
        { gsm: 170, type: 'Art' },
        { gsm: 210, type: 'Art' },
        { gsm: 220, type: 'Art' },
        { gsm: 250, type: 'Art' },
        { gsm: 300, type: 'Art' },
        { gsm: 70, type: 'Litho' },
        { gsm: 80, type: 'Litho' },
      ],
    },

    {
      size: '10.5*21',
      options: [
        { gsm: 300, type: 'Art' },
      ],
    },

    {
      size: '11*8.5',
      options: [
        { gsm: 100, type: 'Art' },
        { gsm: 130, type: 'Art' },
        { gsm: 170, type: 'Art' },
        { gsm: 210, type: 'Art' },
        { gsm: 220, type: 'Art' },
        { gsm: 250, type: 'Art' },
        { gsm: 300, type: 'Art' },
        { gsm: 70, type: 'Litho' },
        { gsm: 80, type: 'Litho' },
      ],
    },

    {
      size: '11*8.5cc',
      options: [
        { gsm: 100, type: 'Art' },
        { gsm: 130, type: 'Art' },
        { gsm: 170, type: 'Art' },
        { gsm: 220, type: 'Art' },
        { gsm: 330, type: 'Art' },
      ],
    },

    {
      size: '11*17',
      options: [
        { gsm: 100, type: 'Art' },
        { gsm: 130, type: 'Art' },
        { gsm: 170, type: 'Art' },
        { gsm: 210, type: 'Art' },
        { gsm: 220, type: 'Art' },
        { gsm: 250, type: 'Art' },
        { gsm: 300, type: 'Art' },
        { gsm: 70, type: 'Litho' },
        { gsm: 80, type: 'Litho' },
      ],
    },

    {
      size: '11*17cc',
      options: [
        { gsm: 100, type: 'Art' },
        { gsm: 130, type: 'Art' },
        { gsm: 170, type: 'Art' },
        { gsm: 220, type: 'Art' },
        { gsm: 330, type: 'Art' },
      ],
    },

    {
      size: '11*25.5',
      options: [
        { gsm: 100, type: 'Art' },
        { gsm: 130, type: 'Art' },
        { gsm: 170, type: 'Art' },
        { gsm: 220, type: 'Art' },
        { gsm: 330, type: 'Art' },
      ],
    },

    {
      size: '11.69*8.27(A4)',
      options: [
        { gsm: 100, type: 'Art' },
        { gsm: 130, type: 'Art' },
        { gsm: 170, type: 'Art' },
        { gsm: 220, type: 'Art' },
        { gsm: 330, type: 'Art' },
        { gsm: 70, type: 'Maplitho' },
      ],
    },

    {
      size: '11.69*16.53(A3)',
      options: [
        { gsm: 100, type: 'Art' },
        { gsm: 130, type: 'Art' },
        { gsm: 170, type: 'Art' },
        { gsm: 220, type: 'Art' },
        { gsm: 330, type: 'Art' },
        { gsm: 70, type: 'Maplitho' },
      ],
    },

    {
      size: '12*17',
      options: [
        { gsm: 100, type: 'Art' },
        { gsm: 130, type: 'Art' },
        { gsm: 170, type: 'Art' },
        { gsm: 210, type: 'Art' },
        { gsm: 220, type: 'Art' },
        { gsm: 250, type: 'Art' },
        { gsm: 300, type: 'Art' },
        { gsm: 70, type: 'Litho' },
        { gsm: 80, type: 'Litho' },
      ],
    },

    {
      size: '14*9.5',
      options: [
        { gsm: 100, type: 'Art' },
        { gsm: 130, type: 'Art' },
        { gsm: 170, type: 'Art' },
        { gsm: 210, type: 'Art' },
        { gsm: 220, type: 'Art' },
        { gsm: 250, type: 'Art' },
        { gsm: 300, type: 'Art' },
        { gsm: 70, type: 'Litho' },
        { gsm: 80, type: 'Litho' },
      ],
    },

    {
      size: '14*19',
      options: [
        { gsm: 100, type: 'Art' },
        { gsm: 130, type: 'Art' },
        { gsm: 170, type: 'Art' },
        { gsm: 210, type: 'Art' },
        { gsm: 220, type: 'Art' },
        { gsm: 250, type: 'Art' },
        { gsm: 300, type: 'Art' },
        { gsm: 70, type: 'Litho' },
        { gsm: 80, type: 'Litho' },
      ],
    },

    {
      size: '17*22',
      options: [
        { gsm: 100, type: 'Art' },
        { gsm: 130, type: 'Art' },
        { gsm: 170, type: 'Art' },
        { gsm: 210, type: 'Art' },
        { gsm: 220, type: 'Art' },
        { gsm: 250, type: 'Art' },
        { gsm: 300, type: 'Art' },
        { gsm: 70, type: 'Litho' },
        { gsm: 80, type: 'Litho' },
      ],
    },

    {
      size: '17*24.5',
      options: [
        { gsm: 100, type: 'Art' },
        { gsm: 130, type: 'Art' },
        { gsm: 170, type: 'Art' },
        { gsm: 220, type: 'Art' },
        { gsm: 300, type: 'Art' },
        { gsm: 70, type: 'Maplitho' },
      ],
    },

    {
      size: '20*30',
      options: [
        { gsm: 100, type: 'Art' },
        { gsm: 130, type: 'Art' },
        { gsm: 170, type: 'Art' },
        { gsm: 210, type: 'Art' },
        { gsm: 220, type: 'Art' },
        { gsm: 250, type: 'Art' },
        { gsm: 300, type: 'Art' },
        { gsm: 70, type: 'Litho' },
        { gsm: 80, type: 'Litho' },
      ],
    },

    {
      size: '22*8.5',
      options: [
        { gsm: 100, type: 'Art' },
        { gsm: 130, type: 'Art' },
        { gsm: 170, type: 'Art' },
        { gsm: 210, type: 'Art' },
        { gsm: 220, type: 'Art' },
        { gsm: 250, type: 'Art' },
        { gsm: 300, type: 'Art' },
        { gsm: 70, type: 'Litho' },
        { gsm: 80, type: 'Litho' },
      ],
    },

    {
      size: '28*9.5',
      options: [
        { gsm: 100, type: 'Art' },
        { gsm: 130, type: 'Art' },
        { gsm: 170, type: 'Art' },
        { gsm: 210, type: 'Art' },
        { gsm: 220, type: 'Art' },
        { gsm: 250, type: 'Art' },
        { gsm: 300, type: 'Art' },
        { gsm: 70, type: 'Litho' },
        { gsm: 80, type: 'Litho' },
      ],
    },
  ];

  for (const item of paperData) {
    /* CREATE SIZE */
    const size = await prisma.paperSize.upsert({
      where:
      {
        name: item.size,

      },
      update: {},
      create:
        { name: item.size, },
    });
    /* CREATE OPTIONS */
    for (const option of item.options) {
      /* GSM */
      const gsm = await prisma.gsm.upsert({
        where: { value: option.gsm, },
        update: {},
        create: {
          value: option.gsm,
        },
      });
      /* PAPER TYPE */
      const paperType = await prisma.paperType.upsert({
        where: { name: option.type, },
        update: {},
        create: { name: option.type, },
      }); /* MAPPING */
      await prisma.paperOption.upsert({
        where: {
          sizeId_gsmId_paperTypeId: {
            sizeId: size.id,
            gsmId: gsm.id,
            paperTypeId:
              paperType.id,
          },
        },
        update: {},
        create: {
          sizeId: size.id,
          gsmId: gsm.id,
          paperTypeId: paperType.id,
        },
      });
    }
  }
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
