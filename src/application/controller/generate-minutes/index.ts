/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-await-in-loop */
import { ChatRoles } from '@domain/models/enums';
import { botResponseFromChatCompletions, generateQuestionsFromStrings } from '@main/utils/generic';
import { requestAI } from '@main/utils/ai-interaction';
import { subdivideFileContent } from '@main/utils/file-handler';
import type { AiConfigAllProps, BotResponse, ChatRequest } from '@domain/models/interfaces';

interface generateMeetingMinutesProps {
  aiConfig: AiConfigAllProps;
  fileContent: string;
}

export const generateMeetingMinutes = async ({
  fileContent,
  aiConfig
}: generateMeetingMinutesProps): Promise<BotResponse> => {
  const chatRequest: ChatRequest = {
    chatMessages: [],
    systemMessages: generateQuestionsFromStrings(ChatRoles.SYSTEM, [aiConfig.defaultPrompt])
  };

  let response: BotResponse = { response: '' };

  const contentChunks: string[] = subdivideFileContent(fileContent, aiConfig);

  for (const contentChunk of contentChunks) {
    chatRequest.chatMessages = generateQuestionsFromStrings(ChatRoles.USER, [
      response.response,
      contentChunk
    ]);

    const chatCompletion = await requestAI({ aiConfig, chatRequest });

    response = botResponseFromChatCompletions(chatCompletion);
  }

  return response;
};
