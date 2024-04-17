import { AiModelFields } from '../ai-model';
import { AzureDataFields } from '../azure-data';
import type { Prisma } from 'prisma/client';

export const AiConfigFields: Prisma.AiConfigSelect = {
  aiModel: {
    select: AiModelFields
  },
  aiModelId: true,
  azureData: {
    select: AzureDataFields
  },
  azureDataId: true,
  createdAt: true,
  defaultPrompt: true,
  frequencyPenalty: true,
  id: true,
  maxRetries: true,
  nickname: true,
  presencePenalty: true,
  previewMessageIncluded: true,
  stopSequence: true,
  temperature: true,
  topP: true,
  updatedAt: true
};
