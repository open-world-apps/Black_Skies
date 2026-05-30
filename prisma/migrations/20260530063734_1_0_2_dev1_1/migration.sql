-- AlterTable
ALTER TABLE "users" ADD COLUMN     "birthdate" TIMESTAMP(3),
ADD COLUMN     "country" TEXT;

-- CreateTable
CREATE TABLE "pilot_dossiers" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "archetype" TEXT NOT NULL,
    "pilot_name" VARCHAR(40) NOT NULL,
    "age" INTEGER NOT NULL,
    "height_cm" INTEGER NOT NULL,
    "weight_kg" INTEGER NOT NULL,
    "physical" VARCHAR(240),
    "bio" VARCHAR(1400) NOT NULL,
    "skill_sheet" JSONB NOT NULL,
    "locked_traits" TEXT[],
    "picked_traits" TEXT[],
    "allegiance" TEXT,
    "spawn" TEXT NOT NULL,
    "registry_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pilot_dossiers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pilot_dossiers_user_id_key" ON "pilot_dossiers"("user_id");

-- AddForeignKey
ALTER TABLE "pilot_dossiers" ADD CONSTRAINT "pilot_dossiers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
