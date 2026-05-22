/*
  Warnings:

  - You are about to drop the column `stage` on the `Workflow` table. All the data in the column will be lost.
  - Added the required column `stageId` to the `Workflow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workflow" DROP COLUMN "stage",
ADD COLUMN     "stageId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "WorkflowStage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "WorkflowStage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkflowStage_name_key" ON "WorkflowStage"("name");

-- AddForeignKey
ALTER TABLE "Workflow" ADD CONSTRAINT "Workflow_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "WorkflowStage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
