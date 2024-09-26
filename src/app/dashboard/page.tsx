import { createClient } from "@/utils/supabase/server";
import React from "react";
import { SignOutButton } from "./components/SignOutButton";
import { UserAvatar } from "../components/UserAvatar";
import { CreateWorkoutButton } from "./components/CreateWorkoutButton";
import { CreateWorkoutModal } from "./components/CreateWorkoutModal";
import { H1 } from "../components/H1";
import prisma from "@/lib/prisma";

export default async function DashboardPage({ searchParams }: { searchParams: { creatingWorkout: boolean } }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userWorkouts = await prisma.workout.findMany({ where: { author_id: user!.id } });

  return (
    <div className="t fixed inset-0 h-screen w-screen bg-black p-4 text-sm text-white">
      <H1>Your Workouts</H1>

      <div>
        {userWorkouts.map((workout) => (
          <div key={workout.id} className="text-white">
            <h1>{workout.name}</h1>
          </div>
        ))}
      </div>

      <CreateWorkoutButton className="absolute right-4 top-4" />
      <SignOutButton className="absolute bottom-4 right-4" />

      {searchParams.creatingWorkout && <CreateWorkoutModal />}
    </div>
  );
}
