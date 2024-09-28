"use server";

import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createExercise(exerciseName: string, sets: { name: string; reps: number }[], workoutId: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if user is not logged in return error
  if (!user) {
    return { error: "You are not allowed to do this." };
  }

  const workout = await prisma.workout.findUnique({ where: { id: workoutId } });

  // if workout does not exist return error
  if (!workout) {
    return { error: "Incorrect workout id" };
  }

  // if user is not author of the workout hes trying to add exercise to, return error
  if (workout.author_id !== user.id) {
    return { error: "You are not allowed to do this." };
  }

  const exercise = await prisma.exercise.create({
    data: {
      name: exerciseName,
      workout_id: workoutId,
    },
  });

  await prisma.set.createMany({
    data: sets.map((set) => ({
      name: set.name,
      reps: set.reps,
      exercise_id: exercise.id,
    })),
  });

  revalidatePath("/workout");
  return { error: null };
}
