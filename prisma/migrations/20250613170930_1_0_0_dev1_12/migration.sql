/*
  Warnings:

  - You are about to drop the `BannedUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ipAddr` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ipAddr" VARCHAR(30) NOT NULL;

-- DropTable
DROP TABLE "BannedUser";

-- CreateTable
CREATE TABLE "BannedIP" (
    "id" SERIAL NOT NULL,
    "userId" TEXT,
    "ip" TEXT NOT NULL,
    "reason" TEXT,
    "bannedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "BannedIP_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BannedIP_ip_key" ON "BannedIP"("ip");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_ipAddr_fkey" FOREIGN KEY ("ipAddr") REFERENCES "BannedIP"("ip") ON DELETE RESTRICT ON UPDATE CASCADE;
