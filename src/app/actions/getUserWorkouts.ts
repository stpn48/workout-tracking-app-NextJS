"use server";

import { getUser } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";

export async function getUserWorkouts() {
  const user = await getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const workouts = await prisma.workout.findMany({
    where: {
      author_id: user.id,
    },
  });

  return workouts;
}
