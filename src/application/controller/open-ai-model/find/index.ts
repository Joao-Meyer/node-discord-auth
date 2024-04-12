import { DataSource } from '@infra/database';
import { OpenAiModelFields } from '@application/protocols/fields';
import {
  errorLogger,
  getGenericFilter,
  getPagination,
  messageErrorResponse,
  ok
} from '@main/utils';
import { openAiModelListQueryFields } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';
import type { openAiModelFields, openAiModelQueryFields } from '@data/validation';

export const findOpenAiModelController: Controller =
  () =>
  async ({ query }: Request, response: Response) => {
    try {
      const { skip, take } = getPagination({ query });
      const { orderBy, distinct, where } = getGenericFilter<
        openAiModelQueryFields,
        openAiModelFields
      >({
        list: openAiModelListQueryFields,
        query
      });

      const search = await DataSource.openAiModel.findMany({
        distinct,
        orderBy,
        select: OpenAiModelFields,
        skip,
        take,
        where
      });

      const totalElements = await DataSource.openAiModel.count({
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
