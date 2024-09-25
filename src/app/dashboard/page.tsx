import { createClient } from "@/utils/supabase/server";
import React from "react";
import { SignOutButton } from "./components/SignOutButton";
import { UserAvatar } from "../components/UserAvatar";
import { CreateWorkoutButton } from "./components/CreateWorkoutButton";
import { CreateWorkoutModal } from "./components/CreateWorkoutModal";

export default async function DashboardPage({ searchParams }: { searchParams: { creatingWorkout: boolean } }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="t fixed inset-0 h-screen w-screen bg-black p-4 text-sm text-white">
      <h1 className="text-3xl font-bold">Your Workouts</h1>

      <CreateWorkoutButton className="absolute right-4 top-4" />
      <SignOutButton className="absolute bottom-4 right-4" />

      {searchParams.creatingWorkout && <CreateWorkoutModal />}
    </div>
  );
}
