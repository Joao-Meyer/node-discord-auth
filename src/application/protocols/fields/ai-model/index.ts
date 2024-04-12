import { OpenAiModelFields } from '../open-ai-model';
import type { Prisma } from '@prisma/client';

export const AiModelFields: Prisma.AiModelSelect = {
  createdAt: true,
  deploymentId: true,
  id: true,
  nickname: true,
  openAiModel: {
    select: OpenAiModelFields
  },
  openAiModelId: true,
  updatedAt: true
};
