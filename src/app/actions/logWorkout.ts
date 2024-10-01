"use server";

import { getUser } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";

export async function logWorkout(effortsPerExercise: { [exerciseId: string]: number[] }) {
  const user = await getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  for (const exerciseId of Object.keys(effortsPerExercise)) {
    const exercise = await prisma.completedExercise.findUnique({
      where: {
        id: exerciseId,
      },
    });

    if (!exercise) {
      // exercise not found, create on
    }

    // exercise found, push new max effort
  }
}
