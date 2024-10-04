import { getWorkoutExercises } from "@/app/actions/getWorkoutExercises";
import { H1 } from "@/app/components/H1";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ExerciseList } from "./components/ExerciseList";
import prisma from "@/lib/prisma";

export default async function LogWorkoutPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // If no workout ID is provided, redirect immediately
  if (!id) {
    redirect("/dashboard");
  }

  // Fetch workout details
  const workoutDetails = await prisma.workout.findFirst({
    where: { id },
  });

  // If workout is not found, throw an error and redirect
  if (!workoutDetails) {
    redirect("/dashboard");
  }

  // Fetch exercises for the workout
  const { error, exercises } = await getWorkoutExercises(id);

  if (error || !exercises) {
    redirect("/dashboard");
  }

  return (
    <div className="main-bg min-h-screen w-screen p-4 text-sm text-white">
      <div className="flex flex-col gap-1">
        <Link prefetch={true} className="text-base" href="/dashboard">
          Go Back
        </Link>
        <H1>Log Workout</H1>
      </div>
      <ExerciseList workoutDetails={workoutDetails} exercises={exercises} />
    </div>
  );
}
