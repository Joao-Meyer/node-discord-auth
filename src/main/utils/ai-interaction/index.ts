/* eslint-disable no-param-reassign */
/* eslint-disable no-return-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-undefined */
import { AzureKeyCredential, OpenAIClient } from '@azure/openai';
import { env } from '@main/config';
import type {
  AiConfigAllProps,
  ChatCompletionsOptions,
  ChatRequest
} from '@domain/models/interfaces';
import type { AzureData } from '@prisma/client';
import type { ChatCompletions, ChatRequestMessage } from '@azure/openai';

interface getBasicChatCompletionsOptionsProps {
  chatRequest: ChatRequestMessage[];
  aiConfig: AiConfigAllProps;
  chatCompletionsOptions: ChatCompletionsOptions;
}

const getBasicChatCompletionsOptions = ({
  aiConfig,
  chatCompletionsOptions
}: getBasicChatCompletionsOptionsProps): ChatCompletionsOptions => {
  return {
    ...chatCompletionsOptions,
    frequencyPenalty: aiConfig.frequencyPenalty,
    presencePenalty: aiConfig.presencePenalty,
    temperature: aiConfig.temperature,
    topP: aiConfig.topP
  };
};

interface addAZExtensionsOptionsProps {
  chatCompletionsOptions: ChatCompletionsOptions;
  aiConfig: AiConfigAllProps;
  azureData: AzureData;
}

const addAZExtensionsOptions = ({
  chatCompletionsOptions,
  aiConfig,
  azureData
}: addAZExtensionsOptionsProps): ChatCompletionsOptions => {
  return {
    ...chatCompletionsOptions,
    azureExtensionOptions: {
      extensions: [
        ...(chatCompletionsOptions.azureExtensionOptions?.extensions ?? []),
        {
          endpoint: env.AZ_CS_ENDPOINT,
          inScope: false,
          indexName: azureData.indexName,
          key: env.AZ_CS_KEY,
          roleInformation: aiConfig.defaultPrompt,
          type: 'AzureCognitiveSearch'
        }
      ]
    }
  };
};

const includeMessagesOnCompletionOptions = (
  chatCompletionsOptions: ChatCompletionsOptions,
  chatMessages: ChatRequestMessage[]
): ChatCompletionsOptions => {
  return {
    ...chatCompletionsOptions,
    messages: [...chatCompletionsOptions.messages, ...chatMessages]
  };
};

interface createChatCompletionProps {
  chatCompletionsOptions: ChatCompletionsOptions;
  aiConfig: AiConfigAllProps;
}

const createChatCompletion = async ({
  chatCompletionsOptions,
  aiConfig
}: createChatCompletionProps): Promise<ChatCompletions> => {
  const client = new OpenAIClient(
    env.AZ_OAI_API_BASE_URL,
    new AzureKeyCredential(env.AZ_OAI_API_KEY),
    {
      apiVersion: env.AZ_OAI_API_VERSION
    }
  );

  const { azureData } = aiConfig;

  if (azureData !== null)
    chatCompletionsOptions = addAZExtensionsOptions({
      aiConfig,
      azureData,
      chatCompletionsOptions
    });

  return await client.getChatCompletions(
    aiConfig.aiModel.deploymentId,
    chatCompletionsOptions.messages,
    {
      ...chatCompletionsOptions
    }
  );
};

interface requestAIProps {
  chatRequest: ChatRequest;
  aiConfig: AiConfigAllProps;
}

export const requestAI = async ({
  aiConfig,
  chatRequest
}: requestAIProps): Promise<ChatCompletions> => {
  let chatCompletionsOptions: ChatCompletionsOptions = {
    messages: []
  };

  chatCompletionsOptions = includeMessagesOnCompletionOptions(
    chatCompletionsOptions,
    chatRequest.systemMessages
  );

  chatCompletionsOptions = includeMessagesOnCompletionOptions(
    chatCompletionsOptions,
    chatRequest.chatMessages
  );

  chatCompletionsOptions = getBasicChatCompletionsOptions({
    aiConfig,
    chatCompletionsOptions,
    chatRequest: chatCompletionsOptions.messages
  });

  return await createChatCompletion({ aiConfig, chatCompletionsOptions });
};
