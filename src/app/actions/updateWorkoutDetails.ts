"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type Props = {
  newName: string;
  newDescription: string;
  newEstimatedTime: string;
  workoutId: string;
};

export async function updateWorkoutDetails({
  newName,
  newDescription,
  newEstimatedTime,
  workoutId,
}: Props) {
  if (!newName || !newDescription || !newEstimatedTime) {
    return { error: "Unexpected Error. Please fill in all fields" };
  }

  let newEstimatedTimeNumber;

  try {
    newEstimatedTimeNumber = parseInt(newEstimatedTime);
  } catch {
    return { error: "Unexpected Error. Please enter a valid estimated time" };
  }

  await prisma.workout.update({
    where: {
      id: workoutId,
    },
    data: {
      name: newName,
      description: newDescription,
      estimated_time: newEstimatedTimeNumber,
    },
  });

  revalidatePath("/workout");
  return { error: null };
}
