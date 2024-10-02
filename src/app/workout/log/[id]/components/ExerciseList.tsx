"use client";

import { ExerciseDetails } from "@/types/type";
import React, { useCallback, useEffect, useState } from "react";
import { LogExerciseCard } from "./LogExerciseCard";
import { Button } from "@/app/components/Button";
import toast from "react-hot-toast";
import { logWorkout } from "@/app/actions/logWorkout";

type Props = {
  exercises: ExerciseDetails[];
};

export function ExerciseList({ exercises }: Props) {
  const [effortsPerExercise, setEffortsPerExercise] = useState<{
    [exerciseId: string]: { [setId: string]: number };
  }>({}); // each exercise id has a object of set id's and each set id has the effort

  const handleFinishClick = useCallback(async () => {
    // check if all sets are filled

    if (Object.keys(effortsPerExercise).length !== exercises.length) {
      toast.error("Please complete all sets for each exercise 1");
      return;
    }

    for (const exerciseId of Object.keys(effortsPerExercise)) {
      if (
        Object.keys(effortsPerExercise[exerciseId]).length !==
        exercises.find((exercise) => exercise.id === exerciseId)!.sets.length
      ) {
        toast.error("Please complete all sets for each exercise 2");
        return;
      }
    }
    toast.success("All fields filled");

    try {
      await logWorkout(effortsPerExercise);
      toast.success("Workout logged successfully");
    } catch (error: any) {
      toast.error("Failed to log workout", error);
      return;
    }
  }, [effortsPerExercise, exercises]);

  useEffect(() => {
    console.log(effortsPerExercise);
  }, [effortsPerExercise]);

  return (
    <div className="mt-10 flex w-full justify-center">
      {exercises.map((exercise) => (
        <LogExerciseCard
          key={exercise.id}
          exercise={exercise}
          setEffortsPerExercise={setEffortsPerExercise}
        />
      ))}
      <Button className="absolute bottom-4 right-4 text-base" onClick={handleFinishClick}>
        Finish
      </Button>
    </div>
  );
}
