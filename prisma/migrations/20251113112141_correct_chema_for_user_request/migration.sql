/*
  Warnings:

  - You are about to drop the column `assignedTo` on the `contact_requests` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `contact_requests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "contact_requests" DROP COLUMN "assignedTo",
DROP COLUMN "notes";
