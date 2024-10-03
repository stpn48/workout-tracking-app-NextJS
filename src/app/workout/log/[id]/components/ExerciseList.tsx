"use client";

import { ExerciseDetails } from "@/types/type";
import React, { useCallback, useEffect, useState } from "react";
import { LogExerciseCard } from "./LogExerciseCard";
import { Button } from "@/app/components/Button";
import toast from "react-hot-toast";
import { logWorkout } from "@/app/actions/logWorkout";
import { useRouter } from "next/navigation";
import { Workout } from "@prisma/client";

type Props = {
  workoutDetails: Workout;
  exercises: ExerciseDetails[];
};

export function ExerciseList({ exercises, workoutDetails }: Props) {
  const [effortsPerExercise, setEffortsPerExercise] = useState<{
    [exerciseName: string]: { [setId: string]: number };
  }>({}); // each exercise id has a object of set id's and each set id has the effort

  const router = useRouter();

  const handleFinishClick = useCallback(async () => {
    // check if all sets are filled

    if (Object.keys(effortsPerExercise).length !== exercises.length) {
      toast.error("Fill all sets for each exercise ");
      return;
    }

    for (const exerciseName of Object.keys(effortsPerExercise)) {
      if (
        Object.keys(effortsPerExercise[exerciseName]).length !==
        exercises.find((exercise) => exercise.name === exerciseName)!.sets.length
      ) {
        toast.error("Fill all sets for each exercise ");
        return;
      }
    }
    toast.success("All fields filled");

    try {
      await logWorkout({ effortsPerExercise, workoutDetails });
      toast.success("Workout logged successfully");
      router.push("/dashboard/completedExercises");
    } catch (error: any) {
      toast.error("Failed to log workout", error);
      return;
    }
  }, [effortsPerExercise, exercises, workoutDetails]);

  useEffect(() => {
    if (exercises.length === 0) {
      router.replace("/dashboard");
      toast.error("You need to add exercises to log a workout");
    }
  }, [exercises]);

  return (
    <div className="mt-10 flex w-full justify-center">
      <div className="flex flex-wrap gap-4">
        {exercises.map((exercise) => (
          <LogExerciseCard
            key={exercise.id}
            exercise={exercise}
            setEffortsPerExercise={setEffortsPerExercise}
          />
        ))}
      </div>
      <Button className="absolute bottom-4 right-4 text-base" onClick={handleFinishClick}>
        Finish
      </Button>
    </div>
  );
}
