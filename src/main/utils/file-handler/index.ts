/* eslint-disable no-warning-comments */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { countTokens } from '../generic';
import { env } from '@main/config';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import type { AiConfigAllProps } from '@domain/models/interfaces';
import type { TiktokenModel } from 'tiktoken';

const checkTempStorageDir = (): void => {
  const dirPath = path.join(__dirname, '..', '..', '..', 'static', 'uploads');

  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', '..', 'static', 'uploads'));
  },
  filename(req, file, cb) {
    checkTempStorageDir();

    const randomString = String(Math.random()).replace('0.', '');

    const ext = path.extname(file.originalname);

    const fileName = `${randomString}_${Date.now()}${ext}`;

    cb(null, fileName);
  }
});

const fileFilter = (req: any, file: any, cb: any): void => {
  if (file.mimetype === 'text/plain') cb(null, true);
  else cb(new Error('Apenas arquivos de texto (.txt) são permitidos.'));
};

export const checkFileAllowed = (fileName: string): boolean => {
  return (
    fileName.includes('.') &&
    env.ALLOWED_FILE_EXTENSIONS.includes(fileName.split('.').pop()!.toLowerCase())
  );
};

export const fileCheck = (
  req: any
): {
  hasFile: boolean;
  filePath: string;
} => {
  if (!req.file)
    return {
      filePath: '',
      hasFile: false
    };

  return {
    filePath: req.file.path,
    hasFile: true
  };
};

const divideTextIntoChunks = (text: string, chunksQuantity: number): string[] => {
  const chunkSize = Math.ceil(text.length / chunksQuantity);
  const chunks = [];

  for (let index = 0; index < chunksQuantity; index += 1) {
    const start = index * chunkSize;
    const end = start + chunkSize;

    chunks.push(text.slice(start, end));
  }

  return chunks;
};

export const subdivideFileContent = (fileContent: string, aiConfig: AiConfigAllProps): string[] => {
  const promptTokens = countTokens(
    aiConfig.defaultPrompt,
    aiConfig.aiModel.openAiModel.name as TiktokenModel
  );

  const contentTokens = countTokens(
    fileContent,
    aiConfig.aiModel.openAiModel.name as TiktokenModel
  );

  const messageTokensPercentage = 0.72;

  const maxMessageTokens = aiConfig.aiModel.openAiModel.maxTokens * messageTokensPercentage;

  const chunksQuantity = Math.ceil((contentTokens + promptTokens) / maxMessageTokens);

  return divideTextIntoChunks(fileContent, chunksQuantity);
};

export const getFileContent = (filePath: string): string => {
  return fs.readFileSync(filePath, 'utf8');
};

export const removeFile = (filePath: string): void => {
  fs.unlink(filePath, () => {});
};

export const upload = multer({ fileFilter, storage });

// TODO: método que realiza upload de um arquivo para azure

// TODO: método que traz o conteúdo de um arquivo da azure
