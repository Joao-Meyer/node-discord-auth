import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import {
  badRequest,
  errorLogger,
  messageErrorResponse,
  ok,
  validationErrorResponse
} from '@main/utils';
import { insertUserSchema } from '@data/validation';
import { messages } from '@domain/helpers';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  login: string;
  password: string;
}

export const insertUserController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await insertUserSchema.validate(request, { abortEarly: false });

      const { login, password } = request.body as Body;

      const hasUser = await DataSource.user.findUnique({
        select: {
          id: true
        },
        where: {
          login
        }
      });

      if (hasUser !== null)
        return badRequest({ message: messages.auth.userAlreadyExists, response });

      await DataSource.user.create({
        data: { login, password },
        select: {
          id: true
        }
      });

      return ok({ response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return messageErrorResponse({ error, response });
    }
  };
