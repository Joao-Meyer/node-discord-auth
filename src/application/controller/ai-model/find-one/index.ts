import { AiModelFields } from '@application/protocols/fields/ai-model';
import { DataSource } from '@infra/database';
import { errorLogger, messageErrorResponse, notFound, ok } from '@main/utils';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

export const findOneAiModelController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      const aiModel = await DataSource.aiModel.findUnique({
        select: AiModelFields,
        where: {
          id: Number(request.params.id)
        }
      });

      if (aiModel === null)
        return notFound({
          field: {
            english: 'Ai Model',
            portuguese: 'Modelo de IA'
          },
          response
        });

      return ok({
        payload: aiModel,
        response
      });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, response });
    }
  };
