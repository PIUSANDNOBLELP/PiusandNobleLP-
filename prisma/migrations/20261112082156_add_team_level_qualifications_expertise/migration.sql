-- CreateEnum
CREATE TYPE "TeamLevel" AS ENUM ('PARTNER', 'ASSOCIATE');

-- AlterTable
ALTER TABLE "TeamMember" ADD COLUMN     "expertise" TEXT,
ADD COLUMN     "level" "TeamLevel" NOT NULL DEFAULT 'ASSOCIATE',
ADD COLUMN     "qualifications" TEXT;

-- CreateIndex
CREATE INDEX "TeamMember_level_idx" ON "TeamMember"("level");
