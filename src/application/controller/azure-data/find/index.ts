import { AzureDataFields } from '@application/protocols/fields/azure-data';
import { DataSource } from '@infra/database';
import { azureDataListQueryFields } from '@data/validation';
import {
  errorLogger,
  getGenericFilter,
  getPagination,
  messageErrorResponse,
  ok
} from '@main/utils';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';
import type { azureDataFields, azureDataQueryFields } from '@data/validation';

export const findAzureDataController: Controller =
  () =>
  async ({ query }: Request, response: Response) => {
    try {
      const { skip, take } = getPagination({ query });
      const { orderBy, distinct, where } = getGenericFilter<azureDataQueryFields, azureDataFields>({
        list: azureDataListQueryFields,
        query
      });

      const search = await DataSource.azureData.findMany({
        distinct,
        orderBy,
        select: AzureDataFields,
        skip,
        take,
        where
      });

      const totalElements = await DataSource.azureData.count({
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
