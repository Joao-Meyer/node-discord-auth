import { ProjectFields } from '../project';
import type { Prisma } from 'prisma/client';

export const MinutesSentFields: Prisma.MinutesSentSelect = {
  createdAt: true,
  id: true,
  minuteFilePath: true,
  nickname: true,
  project: {
    select: ProjectFields
  },
  projectId: true,
  transcriptionFilePath: true,
  updatedAt: true
};
