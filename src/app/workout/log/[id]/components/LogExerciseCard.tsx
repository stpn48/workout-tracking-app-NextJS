"use client";

import { ExerciseDetails } from "@/types/type";
import React, { useCallback } from "react";
import { ExerciseSetList } from "./ExerciseSetList";

type Props = {
  exercise: ExerciseDetails;
  setEffortsPerExercise: React.Dispatch<
    React.SetStateAction<{ [exerciseName: string]: { [setId: string]: number } }>
  >;
};

export function LogExerciseCard({ exercise, setEffortsPerExercise }: Props) {
  const addEffort = useCallback(
    (setId: string, effort: number) => {
      setEffortsPerExercise((prev) => {
        const newEfforts = { ...prev };

        if (!newEfforts[exercise.name]) {
          newEfforts[exercise.name] = {};
        }
        newEfforts[exercise.name][setId] = effort;
        return newEfforts;
      });
    },
    [setEffortsPerExercise, exercise.name],
  );

  const removeEffort = useCallback(
    (setId: string) => {
      setEffortsPerExercise((prev) => {
        const newEfforts = { ...prev };
        if (newEfforts[exercise.name]) {
          // Remove the specific set's effort
          delete newEfforts[exercise.name][setId];

          // Optionally remove the exercise entry if no sets are left
          if (Object.keys(newEfforts[exercise.name]).length === 0) {
            delete newEfforts[exercise.name];
          }
        }

        return newEfforts;
      });
    },
    [exercise.name, setEffortsPerExercise],
  );

  return (
    <div className="main-border-color w-[250px] rounded-lg border p-4">
      <h1>{exercise.name}</h1>
      <ExerciseSetList addEffort={addEffort} removeEffort={removeEffort} sets={exercise.sets} />
    </div>
  );
}
