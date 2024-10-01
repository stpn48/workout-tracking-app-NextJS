"use server";

import prisma from "@/lib/prisma";
import { LoggedExercise } from "@/types/type";
import { getUser } from "@/utils/supabase/server";

export async function updateCompletedExercise(id: string, data: LoggedExercise) {
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthenticated.");
  }

  if (!id || !data) {
    throw new Error("Unexpected error. Arguments not provided");
  }

  const exercise = await prisma.completedExercise.findFirst({
    where: { id },
  });

  if (!exercise) {
    throw new Error("Exercise not found. Incorrect id provided.");
  }

  // add maxReps for this exercise to the existing ones
  await prisma.completedExercise.update({
    where: {
      id,
    },
    data: {
      maxRepsHistory: [...exercise.maxRepsHistory, data.maxReps],
    },
  });
}
