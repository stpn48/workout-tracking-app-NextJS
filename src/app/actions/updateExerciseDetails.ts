"use server";

import { getUser } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";

export async function updateExerciseDetails(
  exerciseId: string,
  workoutId: string,
  newName: string,
  newSets: { name: string; reps: number }[],
) {
  const user = await getUser();

  if (!workoutId || !user || !exerciseId) {
    throw new Error("Invalid input");
  }

  const workoutDetails = await prisma.workout.findUnique({ where: { id: workoutId } });

  if (!workoutDetails || workoutDetails.author_id !== user.id) {
    throw new Error("Invalid workout");
  }

  await prisma.exercise.update({
    where: {
      id: exerciseId,
    },
    data: {
      name: newName,
    },
  });

  // delete existing sets
  await prisma.set.deleteMany({
    where: {
      exercise_id: exerciseId,
    },
  });

  // create new sets
  await prisma.set.createMany({
    data: newSets.map((set) => ({
      exercise_id: exerciseId,
      name: set.name,
      reps: set.reps,
    })),
  });

  return { error: null };
}
