-- CreateTable
CREATE TABLE "ProofProcess" (
    "id" SERIAL NOT NULL,
    "workflowId" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "designedBy" TEXT,
    "checkedBy" TEXT,
    "approvedBy" TEXT,
    "assignedDate" TIMESTAMP(3),
    "deadline" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProofProcess_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProofProcess" ADD CONSTRAINT "ProofProcess_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "Workflow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
