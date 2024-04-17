import { DataSource } from 'infra/database';
import { badRequest, errorLogger, messageErrorResponse, ok } from 'main/utils';
import type { Controller } from 'application/protocols';
import type { Request, Response } from 'express';

export const findOneUserController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      const user = await DataSource.user.findUnique({
        select: {
          createdAt: true,
          id: true,
          login: true,
          updatedAt: true
        },
        where: {
          id: Number(request.params.id)
        }
      });

      if (user === null) return badRequest({ response });

      return ok({
        payload: user,
        response
      });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, response });
    }
  };
