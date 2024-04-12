/* eslint-disable @typescript-eslint/init-declarations */
import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { errorLogger, messageErrorResponse, ok, validationErrorResponse } from '@main/utils';
import { updateProjectSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  nickname?: string;
}

export const updateProjectController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await updateProjectSchema.validate(request, { abortEarly: false });

      const { nickname } = request.body as Body;

      await DataSource.project.update({
        data: { nickname },
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
