import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { errorLogger, messageErrorResponse, ok, validationErrorResponse } from '@main/utils';
import { insertProjectSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  nickname: string;
}

export const insertProjectController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await insertProjectSchema.validate(request, { abortEarly: false });

      const { nickname } = request.body as Body;

      await DataSource.project.create({
        data: { nickname },
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
