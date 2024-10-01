"use client";

import { ExerciseDetails } from "@/types/type";
import React, { useCallback, useEffect, useState } from "react";
import { LogExerciseCard } from "./LogExerciseCard";
import { Button } from "@/app/components/Button";
import toast from "react-hot-toast";
import { logWorkout } from "@/app/actions/LogWorkout";

type Props = {
  exercises: ExerciseDetails[];
};

export function ExerciseList({ exercises }: Props) {
  const [effortsPerExercise, setEffortsPerExercise] = useState<{ [exerciseId: string]: number[] }>(
    {},
  );

  const handleFinishClick = useCallback(async () => {
    // check if all sets are filled
    for (const exerciseId of Object.keys(effortsPerExercise)) {
      if (
        effortsPerExercise[exerciseId].length !==
        exercises.find((exercise) => exercise.id === exerciseId)!.sets.length
      ) {
        toast.error("Please complete all sets for each exercise");
        return;
      }
    }

    await logWorkout(effortsPerExercise);
  }, [effortsPerExercise]);

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
