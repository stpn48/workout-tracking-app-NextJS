"use server";

import prisma from "@/lib/prisma";
import { getUser } from "@/utils/supabase/server";

export async function removeExercise(exerciseId: string, workoutId: string) {
  const user = await getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const workoutDetails = await prisma.workout.findFirst({
    where: { id: workoutId },
  });

  if (!workoutDetails || workoutDetails.author_id !== user.id) {
    throw new Error("Workout not found");
  }

  await prisma.set.deleteMany({
    where: {
      exercise_id: exerciseId,
    },
  });

  await prisma.exercise.delete({
    where: {
      id: exerciseId,
    },
  });
}
