import { Workout } from "@prisma/client";

export type WorkoutDetails = Workout & {
  exercises: {
    name: string;
    id: string;
    workout_id: string;
  }[];
};
