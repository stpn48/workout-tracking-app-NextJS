import React from "react";
import { SignOutButton } from "./components/SignOutButton";
import { CreateWorkoutButton } from "./components/CreateWorkoutButton";
import { CreateWorkoutModal } from "./components/CreateWorkoutModal";
import { WorkoutCardList } from "./components/WorkoutCardList";
import { getUserWorkouts } from "../actions/getUserWorkouts";

export default async function DashboardPage({}: {}) {
  const userWorkouts = await getUserWorkouts();

  return (
    <div className="bg-black text-sm text-white">
      <WorkoutCardList workouts={userWorkouts} />

      <CreateWorkoutButton className="absolute right-4 top-4" />
      <SignOutButton className="absolute bottom-4 right-4" />

      <CreateWorkoutModal />
    </div>
  );
}
