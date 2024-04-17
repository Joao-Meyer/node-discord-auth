import type { Prisma } from '@prisma/client';

export const OpenAiModelFields: Prisma.OpenAiModelSelect = {
  createdAt: true,
  id: true,
  maxTokens: true,
  name: true,
  updatedAt: true
};
