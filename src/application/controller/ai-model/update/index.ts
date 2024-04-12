/* eslint-disable @typescript-eslint/init-declarations */
import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { errorLogger, messageErrorResponse, ok, validationErrorResponse } from '@main/utils';
import { updateAiModelSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  deploymentId?: string;
  openAiModelId?: number;
  nickname?: string;
}

export const updateAiModelController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await updateAiModelSchema.validate(request, { abortEarly: false });

      const { deploymentId, openAiModelId, nickname } = request.body as Body;

      await DataSource.aiModel.update({
        data: { deploymentId, nickname, openAiModelId },
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
