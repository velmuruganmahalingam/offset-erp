-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sections" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "ofNo" TEXT NOT NULL,
    "jobType" TEXT NOT NULL,
    "processType" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "mobile" TEXT,
    "place" TEXT,
    "orderTakenBy" TEXT,
    "specification" JSONB NOT NULL,
    "coverDetails" JSONB,
    "paymentDetails" JSONB,
    "workflow" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaperSize" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PaperSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaperGsm" (
    "id" SERIAL NOT NULL,
    "gsm" INTEGER NOT NULL,
    "paperType" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sizeId" INTEGER NOT NULL,

    CONSTRAINT "PaperGsm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Project_ofNo_key" ON "Project"("ofNo");

-- AddForeignKey
ALTER TABLE "PaperGsm" ADD CONSTRAINT "PaperGsm_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "PaperSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
