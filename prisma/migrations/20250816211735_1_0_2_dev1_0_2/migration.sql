/*
  Warnings:

  - You are about to drop the column `userId` on the `Banned` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Banned" DROP COLUMN "userId",
ALTER COLUMN "ip" DROP NOT NULL;
