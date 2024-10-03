import React from "react";
import prisma from "@/lib/prisma";
import { getUser } from "@/utils/supabase/server";
import { CompletedWorkoutCard } from "./components/CompletedWorkoutCard";
import { comment } from "postcss";

export default async function CompletedWorkoutsPage() {
  const user = await getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const completedWorkouts = await prisma.completedWorkout.findMany({
    where: {
      author_id: user.id,
    },
  });

  return (
    <div>
      <div className="mt-10 text-white">
        {completedWorkouts.length === 0 && (
          <p className="text-secondary flex w-full justify-center text-xs">
            You hasn't completed any workout yet.
          </p>
        )}
        {completedWorkouts.map((completedWorkout) => (
          <CompletedWorkoutCard key={completedWorkout.id} completedWorkout={completedWorkout} />
        ))}
      </div>
    </div>
  );
}
