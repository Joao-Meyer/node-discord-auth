import { DataSource } from '@infra/database';
import { MinutesSentFields } from '@application/protocols/fields';
import { errorLogger, messageErrorResponse, notFound, ok } from '@main/utils';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

export const findOneMinutesSentController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      const minutesSent = await DataSource.minutesSent.findUnique({
        select: MinutesSentFields,
        where: {
          id: Number(request.params.id)
        }
      });

      if (minutesSent === null)
        return notFound({
          field: {
            english: 'Minutes',
            portuguese: 'Ata'
          },
          response
        });

      return ok({
        payload: minutesSent,
        response
      });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, response });
    }
  };
