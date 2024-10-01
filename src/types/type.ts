import { Exercise, Set } from "@prisma/client";

export type SetDetails = {
  name: string;
  reps: number;
};

export type ExerciseDetails = Exercise & { sets: Set[] };
