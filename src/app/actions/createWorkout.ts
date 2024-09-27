"use server";

import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createWorkout(formData: FormData) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Only authenticated users can create workouts." };
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const estimatedTime = formData.get("estimatedTime") as string;

  if (!name || !description || !estimatedTime) {
    return { error: "Unexpected error. Please fill out all fields" };
  }

  try {
    await prisma.workout.create({
      data: {
        name,
        description,
        estimated_time: parseInt(estimatedTime),
        exercises: undefined,
        author_id: user.id,
      },
    });

    revalidatePath("/dashboard");
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}
