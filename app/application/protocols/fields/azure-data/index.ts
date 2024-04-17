import type { Prisma } from 'prisma/client';

export const AzureDataFields: Prisma.AzureDataSelect = {
  blobContainer: true,
  createdAt: true,
  id: true,
  indexName: true,
  nickname: true,
  updatedAt: true
};
