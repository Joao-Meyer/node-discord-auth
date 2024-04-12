/* eslint-disable no-return-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { ChatRoles } from '@domain/models/enums';
import { generateQuestionsFromStrings } from '@main/utils/generic';
import { requestAI } from '@main/utils/ai-interaction';
import type { AiConfigAllProps, ChatRequest } from '@domain/models/interfaces';
import type { ChatCompletions, ChatRequestMessage } from '@azure/openai';

interface chatProps {
  chatMessages: ChatRequestMessage[];
  aiConfig: AiConfigAllProps;
  context?: string;
}

export const chat = async ({
  aiConfig,
  chatMessages,
  context
}: chatProps): Promise<ChatCompletions> => {
  const sysMessages = [aiConfig.defaultPrompt];

  if (context) sysMessages.push(context);

  const chatRequest: ChatRequest = {
    chatMessages,
    systemMessages: generateQuestionsFromStrings(ChatRoles.SYSTEM, sysMessages)
  };

  return await requestAI({ aiConfig, chatRequest });
};
