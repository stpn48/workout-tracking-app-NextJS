"use server";

import { LoggedExercise } from "@/types/type";
import { getUser } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";

export async function createCompletedExercise(loggedExercise: LoggedExercise) {
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthenticated.");
  }

  if (!loggedExercise) {
    throw new Error("Unexpected error. Arguments not provided");
  }

  await prisma.completedExercise.create({
    data: {
      timesCompleted: 1,
      name: loggedExercise.name,
      maxRepsHistory: [loggedExercise.maxReps],
      exercise_id: loggedExercise.exerciseId,
    },
  });
}
