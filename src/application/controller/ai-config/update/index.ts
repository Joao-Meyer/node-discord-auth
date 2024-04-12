/* eslint-disable @typescript-eslint/init-declarations */
import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { errorLogger, messageErrorResponse, ok, validationErrorResponse } from '@main/utils';
import { updateAiConfigSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  maxRetries?: number;
  defaultPrompt?: string;
  nickname?: string;
  temperature?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stopSequence?: number;
  azureDataId?: number;
  previewMessageIncluded?: number;
  aiModelId?: number;
}

export const updateAiConfigController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await updateAiConfigSchema.validate(request, { abortEarly: false });

      const {
        aiModelId,
        defaultPrompt,
        nickname,
        azureDataId,
        frequencyPenalty,
        maxRetries,
        presencePenalty,
        previewMessageIncluded,
        stopSequence,
        temperature,
        topP
      } = request.body as Body;

      await DataSource.aiConfig.update({
        data: {
          aiModelId,
          azureDataId,
          defaultPrompt,
          frequencyPenalty,
          maxRetries,
          nickname,
          presencePenalty,
          previewMessageIncluded,
          stopSequence,
          temperature,
          topP
        },
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
