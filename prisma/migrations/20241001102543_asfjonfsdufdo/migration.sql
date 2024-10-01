-- CreateTable
CREATE TABLE "CompletedExercise" (
    "id" TEXT NOT NULL,
    "exercise_id" TEXT NOT NULL,
    "maxRepsHistory" INTEGER[],
    "timesCompleted" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompletedExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompletedWorkout" (
    "id" TEXT NOT NULL,
    "workout_id" TEXT NOT NULL,
    "timesCompleted" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timeTakenHistory" INTEGER[],

    CONSTRAINT "CompletedWorkout_pkey" PRIMARY KEY ("id")
);
