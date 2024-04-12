/*
  Warnings:

  - Made the column `projectId` on table `minutes_sent` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "minutes_sent" DROP CONSTRAINT "minutes_sent_projectId_fkey";

-- AlterTable
ALTER TABLE "minutes_sent" ALTER COLUMN "projectId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "minutes_sent" ADD CONSTRAINT "minutes_sent_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
