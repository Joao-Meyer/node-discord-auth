import { AiConfigFields } from '@application/protocols/fields';
import { DataSource } from '@infra/database';
import { aiConfigListQueryFields } from '@data/validation';
import {
  errorLogger,
  getGenericFilter,
  getPagination,
  messageErrorResponse,
  ok
} from '@main/utils';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';
import type { aiConfigFields, aiConfigQueryFields } from '@data/validation';

export const findAiConfigController: Controller =
  () =>
  async ({ query }: Request, response: Response) => {
    try {
      const { skip, take } = getPagination({ query });
      const { orderBy, distinct, where } = getGenericFilter<aiConfigQueryFields, aiConfigFields>({
        list: aiConfigListQueryFields,
        query
      });

      const search = await DataSource.aiConfig.findMany({
        distinct,
        orderBy,
        select: AiConfigFields,
        skip,
        take,
        where
      });

      const totalElements = await DataSource.aiConfig.count({
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
