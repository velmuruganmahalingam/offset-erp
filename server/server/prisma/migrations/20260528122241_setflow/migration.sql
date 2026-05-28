-- CreateTable
CREATE TABLE "SetMake" (
    "id" SERIAL NOT NULL,
    "workflowId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "deadline" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SetMake_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SetMake" ADD CONSTRAINT "SetMake_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "ProofProcess"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
