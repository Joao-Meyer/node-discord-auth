import { DataSource } from '@infra/database';
import {
  errorLogger,
  getGenericFilter,
  getPagination,
  messageErrorResponse,
  ok
} from '@main/utils';
import { userListQueryFields } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';
import type { userFields, userQueryFields } from '@data/validation';

export const findUserController: Controller =
  () =>
  async ({ query }: Request, response: Response) => {
    try {
      const { skip, take } = getPagination({ query });
      const { orderBy, distinct, where } = getGenericFilter<userQueryFields, userFields>({
        list: userListQueryFields,
        query
      });

      const search = await DataSource.user.findMany({
        distinct,
        orderBy,
        select: {
          createdAt: true,
          id: true,
          login: true,
          updatedAt: true
        },
        skip,
        take,
        where
      });

      const totalElements = await DataSource.user.count({
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
