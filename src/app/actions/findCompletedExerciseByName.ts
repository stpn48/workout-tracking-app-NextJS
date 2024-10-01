"use server";

import prisma from "@/lib/prisma";

export async function findCompletedExerciseByName(name: string) {
  const exercise = await prisma.completedExercise.findFirst({
    where: {
      name: name,
    },
  });

  return exercise;
}
