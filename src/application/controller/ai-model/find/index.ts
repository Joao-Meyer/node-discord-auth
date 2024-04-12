import { AiModelFields } from '@application/protocols/fields/ai-model';
import { DataSource } from '@infra/database';
import { aiModelListQueryFields } from '@data/validation';
import {
  errorLogger,
  getGenericFilter,
  getPagination,
  messageErrorResponse,
  ok
} from '@main/utils';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';
import type { aiModelFields, aiModelQueryFields } from '@data/validation';

export const findAiModelController: Controller =
  () =>
  async ({ query }: Request, response: Response) => {
    try {
      const { skip, take } = getPagination({ query });
      const { orderBy, distinct, where } = getGenericFilter<aiModelQueryFields, aiModelFields>({
        list: aiModelListQueryFields,
        query
      });

      const search = await DataSource.aiModel.findMany({
        distinct,
        orderBy,
        select: AiModelFields,
        skip,
        take,
        where
      });

      const totalElements = await DataSource.aiModel.count({
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
