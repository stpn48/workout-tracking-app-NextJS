/*
  Warnings:

  - Added the required column `order` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Set` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Set" ADD COLUMN     "order" INTEGER NOT NULL;
