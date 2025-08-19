/*
  Warnings:

  - You are about to drop the column `ipAddr` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `BannedIP` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ipId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_ipAddr_fkey";

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "ipAddr",
ADD COLUMN     "ipId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."BannedIP";

-- CreateTable
CREATE TABLE "public"."Banned" (
    "id" SERIAL NOT NULL,
    "userId" TEXT,
    "ip" TEXT NOT NULL,
    "reason" TEXT,
    "bannedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "Banned_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Banned_id_key" ON "public"."Banned"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Banned_ip_key" ON "public"."Banned"("ip");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_ipId_fkey" FOREIGN KEY ("ipId") REFERENCES "public"."Banned"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
