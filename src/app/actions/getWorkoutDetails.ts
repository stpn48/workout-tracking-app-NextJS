"use server";

import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

export async function getWorkoutDetails(workoutId: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!workoutId || !user) {
    return { error: "Your not allowed to do this.", data: null };
  }

  const workoutDetails = await prisma.workout.findUnique({
    where: {
      id: workoutId,
    },
  });

  if (!workoutDetails) {
    return { error: "Workout not found", data: null };
  }

  if (workoutDetails.author_id !== user.id) {
    return { error: "You are not allowed to do this.", data: null };
  }

  return { data: workoutDetails, error: null };
}
