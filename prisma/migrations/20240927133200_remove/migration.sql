/*
  Warnings:

  - You are about to drop the column `difficulty` on the `Workout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "difficulty";

-- DropEnum
DROP TYPE "Difficulty";
