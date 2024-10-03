"use server";

import { getUser } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";
import { Workout } from "@prisma/client";
import { revalidatePath } from "next/cache";

type Props = {
  effortsPerExercise: {
    [exerciseName: string]: { [setId: string]: number };
  };
  workoutDetails: Workout;
};

export async function logWorkout({ effortsPerExercise, workoutDetails }: Props) {
  const user = await getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  //TODO: ADD more security checks

  try {
    // Create or update completedExercises
    for (const exerciseName of Object.keys(effortsPerExercise)) {
      const completedExercise = await prisma.completedExercise.findFirst({
        where: {
          name: exerciseName,
        },
      });

      // Calculate maxReps of this exercise
      let maxReps = -Infinity;

      for (const setId in effortsPerExercise[exerciseName]) {
        if (effortsPerExercise[exerciseName][setId] > maxReps) {
          maxReps = effortsPerExercise[exerciseName][setId];
        }
      }

      // exercise wasn't found create new completedExercise
      if (!completedExercise) {
        await prisma.completedExercise.create({
          data: {
            author_id: user.id,
            name: exerciseName,
            maxRepsHistory: [maxReps],
          },
        });
        continue;
      }

      //exercise already was logged

      await prisma.completedExercise.update({
        where: {
          name: exerciseName,
        },
        data: {
          timesCompleted: completedExercise.timesCompleted + 1,
          maxRepsHistory: [...(completedExercise.maxRepsHistory || []), maxReps],
        },
      });
    }

    // Create or update the completedWorkout
    const completedWorkout = await prisma.completedWorkout.findFirst({
      where: {
        workout_id: workoutDetails.id,
      },
    });

    // If the workout was not found, create a new completedWorkout
    if (!completedWorkout) {
      await prisma.completedWorkout.create({
        data: {
          author_id: user.id,
          name: workoutDetails.name,
          workout_id: workoutDetails.id,
          timesCompleted: 1,
        },
      });
      return;
    }

    // If the workout was found, update the timesCompleted
    await prisma.completedWorkout.update({
      where: {
        id: completedWorkout.id,
      },
      data: {
        timesCompleted: completedWorkout.timesCompleted + 1,
      },
    });

    revalidatePath("/dashboard");
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`Error logging workout: ${e.message}`);
    } else {
      console.error(e);
    }
  }
}
