"use server";

import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

export async function getExerciseDetails(exerciseId: string, workoutId: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!workoutId || !user || !exerciseId) {
    throw new Error("Invalid input");
  }

  const workoutDetails = await prisma.workout.findFirst({
    where: {
      id: workoutId,
    },
  });

  if (!workoutDetails) {
    throw new Error("Workout not found");
  }

  if (workoutDetails.author_id !== user.id) {
    throw new Error("Unauthorized");
  }

  const exercise = await prisma.exercise.findFirst({
    where: {
      id: exerciseId,
    },
  });

  const sets = await prisma.set.findMany({
    where: {
      exercise_id: exerciseId,
    },
  });

  return { ...exercise, sets };
}
