"use server";

import prisma from "@/lib/prisma";
import { WorkoutDetails } from "@/types/type";
import { createClient } from "@/utils/supabase/server";

export async function findWorkoutDetails(workoutId: string) {
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

  const exercises = await prisma.exercise.findMany({
    where: {
      workout_id: workoutId,
    },
  });

  if (!workoutDetails) {
    return { data: null, error: "Workout not found" };
  }

  const finalWorkoutDetails: WorkoutDetails = { ...workoutDetails, exercises: exercises };

  return { data: finalWorkoutDetails, error: null };
}
