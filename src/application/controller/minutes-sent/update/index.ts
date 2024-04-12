/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/init-declarations */
import { DataSource } from '@infra/database';
import { MinutesSentFields } from '@application/protocols/fields';
import { ValidationError } from 'yup';
import {
  badRequest,
  errorLogger,
  messageErrorResponse,
  notFound,
  ok,
  textToTxt,
  validationErrorResponse
} from '@main/utils';
import { random } from '@main/utils/random';
import { updateMinutesSentSchema } from '@data/validation';
import { uploadFileToAzure } from '@infra/azure-blob';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  nickname?: string;
  projectId: number;
  aiConfigId: number;
}

export const updateMinutesSentController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await updateMinutesSentSchema.validate(request, { abortEarly: false });

      const oldMinute = await DataSource.minutesSent.findUnique({
        select: MinutesSentFields,
        where: {
          id: Number(request.params.id)
        }
      });

      if (oldMinute === null)
        return notFound({
          field: {
            english: 'Minute',
            portuguese: 'ATA'
          },
          response
        });

      const { nickname, projectId, aiConfigId } = request.body as Body;

      const aiConfig = await DataSource.aiConfig.findUnique({
        select: {
          azureData: {
            select: {
              blobContainer: true
            }
          }
        },
        where: {
          id: aiConfigId
        }
      });

      if (!aiConfig?.azureData?.blobContainer)
        return notFound({
          field: {
            english: 'Azure Data',
            portuguese: 'Blob da Azure'
          },
          response
        });

      const minutesSent = await DataSource.minutesSent.update({
        data: { nickname, projectId },
        select: {
          id: true,
          nickname: true,
          project: {
            select: {
              nickname: true
            }
          }
        },
        where: {
          id: Number(request.params.id)
        }
      });

      const minute = await fetch(oldMinute.minuteFilePath);

      if (!minute.ok)
        badRequest({
          message: {
            english: 'Error to fetch minutes',
            portuguese: 'Erro ao pegar a ATA'
          },
          response
        });

      const oldContent = await minute.text();
      const newContent = oldContent
        .replace(`Nome da ATA: ${oldMinute.nickname}`, `Nome da ATA: ${minutesSent.nickname}`)
        .replace(
          `Esta ATA faz relação ao projeto: ${oldMinute.project.nickname}`,
          `Esta ATA faz relação ao projeto: ${minutesSent.project.nickname}`
        );

      const minuteFileName = `${Date.now()}-${random()}.txt`;

      textToTxt({
        fileName: minuteFileName,
        text: newContent
      });

      await uploadFileToAzure({
        azurePath: oldMinute.minuteFilePath,
        containerName: aiConfig.azureData.blobContainer,
        fileName: minuteFileName
      });

      return ok({ response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return messageErrorResponse({ error, response });
    }
  };
