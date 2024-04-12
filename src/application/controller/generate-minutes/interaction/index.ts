/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { AiConfigFields } from '@application/protocols/fields';
import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import {
  badRequest,
  errorLogger,
  messageErrorResponse,
  ok,
  validationErrorResponse
} from '@main/utils';
import { fileCheck, getFileContent, removeFile } from '@main/utils/file-handler';
import { generateMeetingMinutes } from '..';
import { generateMinutesInteractionSchema } from '@data/validation';
import { messages } from '@domain/helpers';
import type { AiConfigAllProps } from '@domain/models/interfaces';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  aiConfigId: number;
}

export const generateMinutesController: Controller =
  () => async (request: Request, response: Response) => {
    const { hasFile, filePath } = fileCheck(request);

    if (!hasFile) return badRequest({ message: messages.chat.noFile, response });

    try {
      await generateMinutesInteractionSchema.validate(request, { abortEarly: false });

      const { aiConfigId } = request.body as Body;

      const aiConfig = (await DataSource.aiConfig.findUnique({
        select: AiConfigFields,
        where: {
          id: Number(aiConfigId)
        }
      })) as AiConfigAllProps;

      if (!aiConfig) return badRequest({ message: messages.chat.aiConfigNotFound, response });

      const fileContent = getFileContent(filePath);

      const payload = await generateMeetingMinutes({ aiConfig, fileContent });

      ok({ payload, response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return messageErrorResponse({ error, response });
    } finally {
      removeFile(filePath);
    }
  };
