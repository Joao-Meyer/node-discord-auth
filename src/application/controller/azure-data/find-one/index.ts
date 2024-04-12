import { AzureDataFields } from '@application/protocols/fields/azure-data';
import { DataSource } from '@infra/database';
import { errorLogger, messageErrorResponse, notFound, ok } from '@main/utils';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

export const findOneAzureDataController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      const azureData = await DataSource.azureData.findUnique({
        select: AzureDataFields,
        where: {
          id: Number(request.params.id)
        }
      });

      if (azureData === null)
        return notFound({
          field: {
            english: 'Azure Data',
            portuguese: 'Dado da azure'
          },
          response
        });

      return ok({
        payload: azureData,
        response
      });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, response });
    }
  };
