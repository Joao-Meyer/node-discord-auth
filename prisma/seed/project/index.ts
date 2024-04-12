import { PrismaClient } from '@prisma/client';

export const projectSeed = async (DataSource: PrismaClient): Promise<void> => {
  const aaaaaaa = [
    {
      nickname: 'Projeto teste 0'
    }
  ];

  for (let index = 0; index < 5; index++) {
    aaaaaaa.push({
      nickname: `Projeto teste ${index + 1}`
    });
  }

  await DataSource.project.createMany({
    data: aaaaaaa
  });
};
