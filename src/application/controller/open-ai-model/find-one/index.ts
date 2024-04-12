import { DataSource } from '@infra/database';
import { OpenAiModelFields } from '@application/protocols/fields';
import { errorLogger, messageErrorResponse, notFound, ok } from '@main/utils';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

export const findOneOpenAiModelController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      const openAiModel = await DataSource.openAiModel.findUnique({
        select: OpenAiModelFields,
        where: {
          id: Number(request.params.id)
        }
      });

      if (openAiModel === null)
        return notFound({
          field: {
            english: 'Open ai Model',
            portuguese: 'Modelo da OpenIA'
          },
          response
        });

      return ok({
        payload: openAiModel,
        response
      });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, response });
    }
  };
