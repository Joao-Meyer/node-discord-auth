/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { authenticateSchema } from '@data/validation';
import {
  badRequest,
  errorLogger,
  generateToken,
  messageErrorResponse,
  ok,
  validationErrorResponse
} from '@main/utils';
import { compare } from 'bcrypt';
import { messages } from '@domain/helpers';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  login: string;
  password: string;
}

export const authenticateUserController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await authenticateSchema.validate(request, { abortEarly: false });

      const { login, password } = request.body as Body;

      const user = await DataSource.user.findUnique({
        select: {
          id: true,
          login: true,
          password: true
        },
        where: { login }
      });

      if (user === null)
        return badRequest({
          message: messages.auth.notFound,
          response
        });

      const passwordIsCorrect = await compare(password, user.password);

      if (!passwordIsCorrect)
        return badRequest({
          message: messages.auth.notFound,
          response
        });

      const { accessToken } = generateToken({
        id: user.id,
        login: user.login
      });

      return ok({
        payload: {
          accessToken
        },
        response
      });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return messageErrorResponse({ error, response });
    }
  };
