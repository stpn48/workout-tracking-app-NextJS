"use server";

import { getUser } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";

export async function getCompletedExercises() {
  const user = await getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const completedExercises = await prisma.completedExercise.findMany({
    where: {
      author_id: user.id,
    },
    orderBy: {
      timesCompleted: "desc",
    },
  });

  if (!completedExercises) {
    throw new Error("Completed exercises not found");
  }

  return completedExercises;
}
