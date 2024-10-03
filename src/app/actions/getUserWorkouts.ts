"use server";

import { getUser } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function getUserWorkouts() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const workouts = await prisma.workout.findMany({
    where: {
      author_id: user.id,
    },
  });

  return workouts;
}
