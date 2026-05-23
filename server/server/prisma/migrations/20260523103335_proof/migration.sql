/*
  Warnings:

  - You are about to drop the column `level` on the `ProofProcess` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProofProcess" DROP COLUMN "level",
ADD COLUMN     "correctionCount" INTEGER NOT NULL DEFAULT 0;
