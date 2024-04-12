import { DataSource } from '@infra/database';
import { MinutesSentFields } from '@application/protocols/fields';
import {
  errorLogger,
  getGenericFilter,
  getPagination,
  messageErrorResponse,
  ok
} from '@main/utils';
import { minutesSentListQueryFields } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';
import type { minutesSentFields, minutesSentQueryFields } from '@data/validation';

export const findMinutesSentController: Controller =
  () =>
  async ({ query }: Request, response: Response) => {
    try {
      const { skip, take } = getPagination({ query });
      const { orderBy, distinct, where } = getGenericFilter<
        minutesSentQueryFields,
        minutesSentFields
      >({
        list: minutesSentListQueryFields,
        query
      });

      const search = await DataSource.minutesSent.findMany({
        distinct,
        orderBy,
        select: MinutesSentFields,
        skip,
        take,
        where
      });

      const totalElements = await DataSource.minutesSent.count({
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
