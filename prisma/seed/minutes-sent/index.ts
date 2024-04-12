import { PrismaClient } from '@prisma/client';

export const minutesSentSeed = async (DataSource: PrismaClient): Promise<void> => {
  const aaaaaaa = [
    {
      minuteFilePath:
        'https://blobaiportal.blob.core.windows.net/file-upload/minutes/1711651863222-3412572494830768.txt',
      nickname: 'teste ata 0',
      transcriptionFilePath:
        'https://blobaiportal.blob.core.windows.net/file-upload/minutes/1711651863222-3412572494830768.txt',
      projectId: 1
    }
  ];

  for (let index = 0; index < 15; index++) {
    aaaaaaa.push({
      minuteFilePath:
        'https://blobaiportal.blob.core.windows.net/file-upload/minutes/1711651863222-3412572494830768.txt',
      nickname: `Teste ata ${index + 1}`,
      transcriptionFilePath:
        'https://blobaiportal.blob.core.windows.net/file-upload/minutes/1711651863222-3412572494830768.txt',
      projectId: 1
    });
  }

  await DataSource.minutesSent.createMany({
    data: aaaaaaa
  });
};
