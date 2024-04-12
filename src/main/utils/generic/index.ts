/* eslint-disable import/default */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable camelcase */
/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable eslint-plugin/prefer-object-rule */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { encoding_for_model } from 'tiktoken';
import type { BotResponse } from '@domain/models/interfaces';
import type { ChatCompletions, ChatRequestMessage, ChatRole } from '@azure/openai';
import type { TiktokenModel } from 'tiktoken';

export const checkValue = (variable: any, type?: 'number' | 'string'): number | string => {
  switch (type) {
    case 'number':
      return Number(variable);

    case 'string':
      return String(variable);

    default:
      return '';
  }
};

export const countMessagesTokens = (
  messages: ChatRequestMessage[],
  model?: TiktokenModel
): number => {
  let countedTokens = 0;

  const encoding = encoding_for_model(model ?? 'gpt-4');

  messages.forEach((message) => {
    if (typeof message.content === 'string')
      countedTokens += encoding.encode(message.content).length;
  });

  encoding.free();

  return countedTokens;
};

export const countTokens = (stringToCount: string, model?: TiktokenModel): number => {
  const encoding = encoding_for_model(model ?? 'gpt-4');

  const countedTokens = encoding.encode(stringToCount).length;

  encoding.free();

  return countedTokens;
};

export const theresTokenOverflow = (tokens: number, maxTokens: number): boolean => {
  return tokens > maxTokens;
};

export const generateQuestionsFromStrings = (
  role: ChatRole,
  messages: string[]
): ChatRequestMessage[] => {
  return messages.map((message) => ({ content: message, role } as ChatRequestMessage));
};

export const botResponseFromChatCompletions = (response: ChatCompletions): BotResponse => {
  return { response: response?.choices[0]?.message?.content ?? '', complete_data: response };
};

export const trimMessages = (
  questions: ChatRequestMessage[],
  previewMessageIncluded: number
): ChatRequestMessage[] => {
  return questions.slice(-previewMessageIncluded);
};
