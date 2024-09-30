/*
  Warnings:

  - You are about to drop the column `order` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Set` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "order";

-- AlterTable
ALTER TABLE "Set" DROP COLUMN "order";
