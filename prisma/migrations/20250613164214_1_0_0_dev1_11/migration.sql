/*
  Warnings:

  - You are about to drop the `BannedUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "BannedUsers";

-- CreateTable
CREATE TABLE "BannedUser" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "reason" TEXT,
    "bannedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "BannedUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BannedUser_ip_key" ON "BannedUser"("ip");
