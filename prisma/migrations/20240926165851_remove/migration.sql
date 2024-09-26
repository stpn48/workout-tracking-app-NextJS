/*
  Warnings:

  - You are about to drop the column `workoutId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `exerciseId` on the `Set` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `estimatedTime` on the `Workout` table. All the data in the column will be lost.
  - Added the required column `workout_id` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exercise_id` to the `Set` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_id` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimated_time` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_exerciseId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "workoutId",
ADD COLUMN     "workout_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Set" DROP COLUMN "exerciseId",
ADD COLUMN     "exercise_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "authorId",
DROP COLUMN "estimatedTime",
ADD COLUMN     "author_id" TEXT NOT NULL,
ADD COLUMN     "estimated_time" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
