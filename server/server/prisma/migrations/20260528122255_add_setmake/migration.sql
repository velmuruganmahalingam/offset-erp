/*
  Warnings:

  - You are about to drop the column `workflowId` on the `SetMake` table. All the data in the column will be lost.
  - Added the required column `proofProcessId` to the `SetMake` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SetMake" DROP CONSTRAINT "SetMake_workflowId_fkey";

-- AlterTable
ALTER TABLE "SetMake" DROP COLUMN "workflowId",
ADD COLUMN     "proofProcessId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SetMake" ADD CONSTRAINT "SetMake_proofProcessId_fkey" FOREIGN KEY ("proofProcessId") REFERENCES "ProofProcess"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
