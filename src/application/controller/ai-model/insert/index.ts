import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { errorLogger, messageErrorResponse, ok, validationErrorResponse } from '@main/utils';
import { insertAiModelSchema } from '@data/validation/ai-model';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  deploymentId: string;
  openAiModelId: number;
  nickname: string;
}

export const insertAiModelController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await insertAiModelSchema.validate(request, { abortEarly: false });

      const { deploymentId, openAiModelId, nickname } = request.body as Body;

      await DataSource.aiModel.create({
        data: { deploymentId, nickname, openAiModelId },
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
