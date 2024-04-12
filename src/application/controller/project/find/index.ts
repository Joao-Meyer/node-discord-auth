import { DataSource } from '@infra/database';
import { ProjectFields } from '@application/protocols/fields';
import {
  errorLogger,
  getGenericFilter,
  getPagination,
  messageErrorResponse,
  ok
} from '@main/utils';
import { projectListQueryFields } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';
import type { projectFields, projectQueryFields } from '@data/validation';

export const findProjectController: Controller =
  () =>
  async ({ query }: Request, response: Response) => {
    try {
      const { skip, take } = getPagination({ query });
      const { orderBy, distinct, where } = getGenericFilter<projectQueryFields, projectFields>({
        list: projectListQueryFields,
        query
      });

      const search = await DataSource.project.findMany({
        distinct,
        orderBy,
        select: ProjectFields,
        skip,
        take,
        where
      });

      const totalElements = await DataSource.project.count({
        where
      });

      return ok({
        payload: {
          content: search,
          totalElements,
          totalPages: Math.ceil(totalElements / take)
        },
        response
      });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, response });
    }
  };
