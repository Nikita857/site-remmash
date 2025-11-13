/*
  Warnings:

  - You are about to drop the column `description` on the `questionnaires` table. All the data in the column will be lost.
  - You are about to drop the column `fields` on the `questionnaires` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `questionnaires` table. All the data in the column will be lost.
  - Added the required column `fileUrl` to the `questionnaires` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "questionnaires" DROP COLUMN "description",
DROP COLUMN "fields",
DROP COLUMN "title",
ADD COLUMN     "fileUrl" TEXT NOT NULL;
