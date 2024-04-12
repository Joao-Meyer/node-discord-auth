import { PrismaClient } from '@prisma/client';
import { aiConfigSeed } from './ai-config';
import { aiModelSeed } from './ai-model';
import { azureDataSeed } from './azure-data';
import { openAiModelSeed } from './open-ai-model';
import { minutesSentSeed } from './minutes-sent';
import { projectSeed } from './project';

export const DataSource = new PrismaClient();

export const main = async (): Promise<void> => {
  try {
    await openAiModelSeed(DataSource);
    await aiModelSeed(DataSource);
    await azureDataSeed(DataSource);
    await aiConfigSeed(DataSource);
    // await projectSeed(DataSource);
    // await minutesSentSeed(DataSource);
  } catch (error) {
    throw error;
  }
};

main().catch((err) => {
  console.warn('Error While generating Seed: \n', err);
});
