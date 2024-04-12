import { PrismaClient } from '@prisma/client';

export const openAiModelSeed = async (DataSource: PrismaClient): Promise<void> => {
  await DataSource.openAiModel.createMany({
    data: [
      {
        name: 'gpt-4',
        maxTokens: 8192
      },
      {
        name: 'gpt-4-32k',
        maxTokens: 32768
      },
      // {
      //   name: 'gpt-4-0125-preview',
      //   maxTokens: 128000
      // },
      // {
      //   name: 'gpt-4-turbo-preview',
      //   maxTokens: 128000
      // },
      // {
      //   name: 'gpt-4-1106-preview',
      //   maxTokens: 128000
      // },
      // {
      //   name: 'gpt-4-vision-preview',
      //   maxTokens: 128000
      // },
      // {
      //   name: 'gpt-4-1106-vision-preview',
      //   maxTokens: 128000
      // },
      {
        name: 'gpt-4-0613',
        maxTokens: 8192
      },
      {
        name: 'gpt-4-32k-0613',
        maxTokens: 32768
      }
      // {
      //   name: 'gpt-3.5-turbo-0125',
      //   maxTokens: 16385
      // },
      // {
      //   name: 'gpt-3.5-turbo',
      //   maxTokens: 16385
      // },
      // {
      //   name: 'gpt-3.5-turbo-1106',
      //   maxTokens: 16385
      // },
      // {
      //   name: 'gpt-3.5-turbo-instruct',
      //   maxTokens: 4096
      // },
      // {
      //   name: 'gpt-3.5-turbo-16k',
      //   maxTokens: 16385
      // },
      // {
      //   name: 'gpt-3.5-turbo-0613',
      //   maxTokens: 4096
      // },
      // {
      //   name: 'gpt-3.5-turbo-16k-0613',
      //   maxTokens: 16385
      // }
    ]
  });
};
