import React from "react";
import { SignOutButton } from "./components/SignOutButton";
import { H1 } from "@/app/components/H1";
import { CreateWorkoutButton } from "./components/CreateWorkoutButton";
import { CreateWorkoutModal } from "./components/CreateWorkoutModal";
import { WorkoutCardList } from "./components/WorkoutCardList";
import { getUserWorkouts } from "../actions/getUserWorkouts";

const MemoWorkoutCardList = React.memo(WorkoutCardList);

export default async function DashboardPage({}: {}) {
  const userWorkouts = await getUserWorkouts();

  return (
    <div className="t fixed inset-0 h-screen w-screen bg-black p-4 text-sm text-white">
      <H1>Your Workouts</H1>

      <MemoWorkoutCardList workouts={userWorkouts} />

      <CreateWorkoutButton className="absolute right-4 top-4" />
      <SignOutButton className="absolute bottom-4 right-4" />

      <CreateWorkoutModal />
    </div>
  );
}
