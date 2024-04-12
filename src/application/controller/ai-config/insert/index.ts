import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { errorLogger, messageErrorResponse, ok, validationErrorResponse } from '@main/utils';
import { insertAiConfigSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  maxRetries: number;
  defaultPrompt: string;
  nickname: string;
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  stopSequence?: number;
  azureDataId?: number;
  previewMessageIncluded: number;
  aiModelId: number;
}

export const insertAiConfigController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await insertAiConfigSchema.validate(request, { abortEarly: false });

      const {
        aiModelId,
        defaultPrompt,
        frequencyPenalty,
        maxRetries,
        presencePenalty,
        azureDataId,
        nickname,
        previewMessageIncluded,
        stopSequence,
        temperature,
        topP
      } = request.body as Body;

      await DataSource.aiConfig.create({
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
        }
      });

      return ok({ response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return messageErrorResponse({ error, response });
    }
  };
