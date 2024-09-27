import { createClient } from "@/utils/supabase/server";
import React, { Suspense } from "react";
import { SignOutButton } from "./components/SignOutButton";
import { CreateWorkoutButton } from "./components/CreateWorkoutButton";
import { CreateWorkoutModal } from "./components/CreateWorkoutModal";
import { H1 } from "../components/H1";
import prisma from "@/lib/prisma";
import { WorkoutCard } from "./components/WorkoutCard";
import { EditWorkoutModalVisibility } from "./components/WorkoutDetailsProvider";

export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userWorkouts = await prisma.workout.findMany({ where: { author_id: user!.id } });

  return (
    <div className="t fixed inset-0 h-screen w-screen bg-black p-4 text-sm text-white">
      <H1>Your Workouts</H1>

      <div className="flex flex-wrap gap-4 pt-8">
        {userWorkouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>

      <CreateWorkoutButton className="absolute right-4 top-4" />
      <SignOutButton className="absolute bottom-4 right-4" />

      <CreateWorkoutModal />

      <Suspense fallback={"loading..."}>
        <EditWorkoutModalVisibility />
      </Suspense>
    </div>
  );
}
