/* eslint-disable @typescript-eslint/init-declarations */
import { DataSource } from 'infra/database';
import { ValidationError } from 'yup';
import {
  badRequest,
  errorLogger,
  messageErrorResponse,
  ok,
  validationErrorResponse
} from 'main/utils';
import { messages } from 'domain/helpers';
import { updateUserSchema } from 'data/validation';
import type { Controller } from 'application/protocols';
import type { Request, Response } from 'express';

interface Body {
  password?: string;
  login?: string;
}

export const updateUserController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await updateUserSchema.validate(request, { abortEarly: false });

      const { password, login } = request.body as Body;

      if (typeof login !== 'undefined') {
        const hasUser = await DataSource.user.findUnique({
          select: {
            id: true
          },
          where: {
            login
          }
        });

        if (hasUser !== null && hasUser.id !== Number(request.params.id))
          return badRequest({ message: messages.auth.userAlreadyExists, response });
      }

      let newPassword: string | undefined;

      if (typeof password !== 'undefined') newPassword = password;

      await DataSource.user.update({
        data: { login, password: newPassword },
        select: {
          id: true
        },
        where: {
          id: Number(request.params.id)
        }
      });

      return ok({ response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return messageErrorResponse({ error, response });
    }
  };
