"use server";

import { getUser } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";

export async function logWorkout(effortsPerExercise: {
  [exerciseId: string]: { [setId: string]: number };
}) {
  const user = await getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  //TODO: ADD more security checks

  try {
    for (const exerciseId of Object.keys(effortsPerExercise)) {
      const exercise = await prisma.completedExercise.findFirst({
        where: {
          exercise_id: exerciseId,
        },
      });

      // Calculate maxReps of this exercise
      let maxReps = -Infinity;

      for (const setId in effortsPerExercise[exerciseId]) {
        if (effortsPerExercise[exerciseId][setId] > maxReps) {
          maxReps = effortsPerExercise[exerciseId][setId];
        }
      }

      if (!exercise) {
        await prisma.completedExercise.create({
          data: {
            author_id: user.id,
            exercise_id: exerciseId,
            maxRepsHistory: [maxReps],
          },
        });
        continue;
      }

      //exercise already was logged

      await prisma.completedExercise.update({
        where: {
          id: exercise.id,
        },
        data: {
          timesCompleted: exercise.timesCompleted + 1,
          maxRepsHistory: [...(exercise.maxRepsHistory || []), maxReps],
        },
      });
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`Error logging workout: ${e.message}`);
    } else {
      console.error(e);
    }
  }
}
