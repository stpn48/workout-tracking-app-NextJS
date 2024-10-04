"use server";

import prisma from "@/lib/prisma";
import { ExerciseDetails } from "@/types/type";
import { getUser } from "@/utils/supabase/server";

export async function getWorkoutExercises(workoutId: string) {
  const user = await getUser();

  if (!workoutId || !user) {
    return { error: "Unauthorized" };
  }

  const workoutDetails = await prisma.workout.findUnique({
    where: {
      id: workoutId,
    },
  });

  if (!workoutDetails) {
    return { error: "Workout details not found" };
  }

  if (workoutDetails.author_id !== user.id) {
    return { error: "Unauthorized" };
  }

  // all security check validations passed
  const exercises = await prisma.exercise.findMany({
    where: {
      workout_id: workoutId,
    },
  });

  if (!exercises) {
    return { error: "No exercises found" };
  }

  const finaleExercises: ExerciseDetails[] = [];

  for (const exercise of exercises) {
    const sets = await prisma.set.findMany({
      where: {
        exercise_id: exercise.id,
      },
    });

    finaleExercises.push({ ...exercise, sets });
  }

  // don't know if needed
  finaleExercises.sort((a, b) => {
    return a.created_at.getTime() - b.created_at.getTime();
  });

  return { error: null, exercises: finaleExercises };
}
