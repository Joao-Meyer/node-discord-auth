import { PrismaClient } from '@prisma/client';

export const azureDataSeed = async (DataSource: PrismaClient): Promise<void> => {
  await DataSource.azureData.createMany({
    data: [
      {
        blobContainer: null,
        nickname: 'Kleber Leite wiki',
        indexName: 'index-web-data'
      },
      {
        blobContainer: 'file-upload',
        nickname: 'Blob de ata',
        indexName: 'file-upload'
      }
    ],
    skipDuplicates: true
  });
};
