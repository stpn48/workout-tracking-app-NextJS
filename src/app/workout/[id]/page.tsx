import { getWorkoutDetails } from "@/app/actions/getWorkoutDetails";
import { H1 } from "@/app/components/H1";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { AddExerciseButton } from "./components/AddExerciseButton";
import { AddExerciseModal } from "./components/AddExerciseModal";

type Props = {
  params: { id: string };
};

export default async function WorkoutDetails({ params }: Props) {
  if (!params.id) {
    redirect("/dashboard");
  }

  const { error, data: workoutDetails } = await getWorkoutDetails(params.id);

  if (error || !workoutDetails) {
    redirect("/dashboard");
  }

  return (
    <div className="main-bg fixed inset-0 min-h-screen w-screen p-4 text-white">
      <Link href={"/dashboard"}>Go Back</Link>
      <H1>{workoutDetails.name}</H1>

      <div>
        {workoutDetails.exercises.map((exercise) => (
          //TODO: Add a ExerciseCard component
          <div key={exercise.id}>{exercise.name}</div>
        ))}
      </div>

      <AddExerciseButton className="absolute right-4 top-4 text-sm" />

      <AddExerciseModal workoutId={params.id} />
    </div>
  );
}
