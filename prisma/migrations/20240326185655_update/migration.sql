-- AlterTable
ALTER TABLE "ai_config" ALTER COLUMN "nickname" SET DEFAULT '';

-- CreateTable
CREATE TABLE "minutes_sent" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "minuteFilePath" TEXT NOT NULL,
    "transcriptionFilePath" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "minutes_sent_pkey" PRIMARY KEY ("id")
);
