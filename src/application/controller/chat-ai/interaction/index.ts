/* eslint-disable no-restricted-syntax */
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
import { botResponseFromChatCompletions, trimMessages } from '@main/utils/generic';
import { chat } from '..';
import { chatAiInteractionSchema } from '@data/validation/chat';
import { messages } from '@domain/helpers';
import type { AiConfigAllProps } from '@domain/models/interfaces';
import type { ChatRequestMessage } from '@azure/openai';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  aiConfigId: number;
  questions: ChatRequestMessage[];
  context?: string;
}

export const chatAiInteractionController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await chatAiInteractionSchema.validate(request, { abortEarly: false });

      const { questions, context, aiConfigId } = request.body as Body;

      if (!questions || questions.length === 0)
        return badRequest({ message: messages.chat.noQuestions, response });

      const aiConfig = (await DataSource.aiConfig.findUnique({
        select: AiConfigFields,
        where: {
          id: aiConfigId
        }
      })) as AiConfigAllProps;

      if (!aiConfig) return badRequest({ message: messages.chat.aiConfigNotFound, response });

      const answer = await chat({
        aiConfig,
        chatMessages: trimMessages(questions, aiConfig.previewMessageIncluded),
        context
      });

      return ok({ payload: botResponseFromChatCompletions(answer), response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return messageErrorResponse({ error, response });
    }
  };
