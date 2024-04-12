import { AiConfigFields } from '@application/protocols/fields';
import { DataSource } from '@infra/database';
import { errorLogger, messageErrorResponse, notFound, ok } from '@main/utils';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

export const findOneAiConfigController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      const aiConfig = await DataSource.aiConfig.findUnique({
        select: AiConfigFields,
        where: {
          id: Number(request.params.id)
        }
      });

      if (aiConfig === null)
        return notFound({
          field: {
            english: 'Ai Config',
            portuguese: 'Configuração de IA'
          },
          response
        });

      return ok({
        payload: aiConfig,
        response
      });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, response });
    }
  };
