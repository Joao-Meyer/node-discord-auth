/* eslint-disable @typescript-eslint/init-declarations */
import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { errorLogger, messageErrorResponse, ok, validationErrorResponse } from '@main/utils';
import { updateOpenAiModelSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  maxTokens?: number;
  name?: string;
}

export const updateOpenAiModelController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await updateOpenAiModelSchema.validate(request, { abortEarly: false });

      const { maxTokens, name } = request.body as Body;

      await DataSource.openAiModel.update({
        data: { maxTokens, name },
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
