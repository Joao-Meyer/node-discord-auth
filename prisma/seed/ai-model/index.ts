import { PrismaClient } from '@prisma/client';

export const aiModelSeed = async (DataSource: PrismaClient): Promise<void> => {
  await DataSource.aiModel.createMany({
    data: [
      {
        deploymentId: 'teste-tutor-ai-gpt-4',
        nickname: 'gpt-4-8k',
        openAiModelId: 1
      },
      {
        deploymentId: 'core-gpt-4-32k',
        nickname: 'gpt-4-32k',
        openAiModelId: 2
      }
    ],
    skipDuplicates: true
  });
};
