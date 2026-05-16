/*
  Warnings:

  - You are about to drop the `PaperGsm` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `PaperSize` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "PaperGsm" DROP CONSTRAINT "PaperGsm_sizeId_fkey";

-- DropTable
DROP TABLE "PaperGsm";

-- CreateTable
CREATE TABLE "Gsm" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Gsm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaperType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PaperType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaperOption" (
    "id" SERIAL NOT NULL,
    "sizeId" INTEGER NOT NULL,
    "gsmId" INTEGER NOT NULL,
    "paperTypeId" INTEGER NOT NULL,

    CONSTRAINT "PaperOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gsm_value_key" ON "Gsm"("value");

-- CreateIndex
CREATE UNIQUE INDEX "PaperType_name_key" ON "PaperType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PaperOption_sizeId_gsmId_paperTypeId_key" ON "PaperOption"("sizeId", "gsmId", "paperTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "PaperSize_name_key" ON "PaperSize"("name");

-- AddForeignKey
ALTER TABLE "PaperOption" ADD CONSTRAINT "PaperOption_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "PaperSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaperOption" ADD CONSTRAINT "PaperOption_gsmId_fkey" FOREIGN KEY ("gsmId") REFERENCES "Gsm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaperOption" ADD CONSTRAINT "PaperOption_paperTypeId_fkey" FOREIGN KEY ("paperTypeId") REFERENCES "PaperType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
