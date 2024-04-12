import type { AiConfig, AiModel, AzureData, OpenAiModel } from '@prisma/client';
import type { ChatCompletions, ChatRequestMessage, GetChatCompletionsOptions } from '@azure/openai';

export interface BotResponse {
  response: string;
  complete_data?: ChatCompletions;
}

export type ChatCompletionsOptions = GetChatCompletionsOptions & {
  messages: ChatRequestMessage[];
};

export interface ChatRequest {
  systemMessages: ChatRequestMessage[];
  chatMessages: ChatRequestMessage[];
}

export type AiConfigAllProps = AiConfig & {
  azureData: AzureData | null;
  aiModel: AiModel & { openAiModel: OpenAiModel };
};
