import type { Prisma } from '@prisma/client';

export const ProjectFields: Prisma.ProjectSelect = {
  _count: true,
  createdAt: true,
  id: true,
  nickname: true,
  updatedAt: true
};
