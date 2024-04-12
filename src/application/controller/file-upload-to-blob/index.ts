/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
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
  textToTxt,
  validationErrorResponse
} from '@main/utils';
import { env } from '@main/config';
import { fileCheck, removeFile } from '@main/utils/file-handler';
import { fileUploadToAzureSchema } from '@data/validation';
import { messages } from '@domain/helpers';
import { random } from '@main/utils/random';
import { uploadFileToAzure } from '@infra/azure-blob';
import type { AiConfigAllProps } from '@domain/models/interfaces';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  aiConfigId: string;
  projectId: string;
  minute: string;
  nickname: string;
}

export const fileUploadToAzure: Controller = () => async (request: Request, response: Response) => {
  const { hasFile, filePath } = fileCheck(request);

  if (!hasFile) return badRequest({ message: messages.chat.noFile, response });

  try {
    await fileUploadToAzureSchema.validate(request, { abortEarly: false });

    const { aiConfigId, minute, nickname, projectId } = request.body as Body;

    const project = await DataSource.project.findUnique({
      select: {
        nickname: true
      },
      where: {
        id: Number(projectId)
      }
    });

    if (!project) return badRequest({ message: messages.chat.noProject, response });

    const aiConfig = (await DataSource.aiConfig.findUnique({
      select: AiConfigFields,
      where: {
        id: Number(aiConfigId)
      }
    })) as AiConfigAllProps;

    const { azureData } = aiConfig;

    if (!azureData?.blobContainer)
      return badRequest({ message: messages.chat.noAzureData, response });

    const minuteFileName = `${Date.now()}-${random()}.txt`;
    const minuteFilePath = `${env.AZ_BLOB_URL}${azureData.blobContainer}/minutes/${minuteFileName}`;

    const transcriptionFileName = `${Date.now()}-${random()}.txt`;
    const transcriptionFilePath = `${env.AZ_BLOB_URL}transcription/${transcriptionFileName}`;

    textToTxt({
      fileName: minuteFileName,
      text: `Esta ATA faz relação ao projeto: ${project.nickname}\n\nNome da ATA: ${nickname}\n\n${minute}`
    });

    await uploadFileToAzure({
      azurePath: minuteFilePath,
      containerName: azureData.blobContainer,
      fileName: minuteFileName
    });

    await uploadFileToAzure({
      azurePath: transcriptionFilePath,
      containerName: 'transcription',
      filePath
    });

    await DataSource.minutesSent.create({
      data: {
        minuteFilePath,
        nickname,
        projectId: Number(projectId),
        transcriptionFilePath
      },
      select: {
        id: true
      }
    });

    ok({
      payload: {
        minuteFilePath,
        nickname,
        transcriptionFilePath
      },
      response
    });
  } catch (error) {
    errorLogger(error);

    if (error instanceof ValidationError) return validationErrorResponse({ error, response });

    return messageErrorResponse({ error, response });
  } finally {
    removeFile(filePath);
  }
};
