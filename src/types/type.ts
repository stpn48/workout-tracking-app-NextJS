import { Exercise, Set, Workout } from "@prisma/client";

export type WorkoutDetails = Workout & {
  exercises: ExerciseDetails[];
};

export type ExerciseDetails = Exercise & {
  sets: Set[];
};
