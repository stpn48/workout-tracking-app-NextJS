"use client";

import { ExerciseDetails } from "@/types/type";
import React, { useCallback } from "react";
import { ExerciseSetList } from "./ExerciseSetList";

type Props = {
  exercise: ExerciseDetails;
  setEffortsPerExercise: React.Dispatch<
    React.SetStateAction<{ [exerciseId: string]: { [setId: string]: number } }>
  >;
};

export function LogExerciseCard({ exercise, setEffortsPerExercise }: Props) {
  const addEffort = useCallback(
    (setId: string, effort: number) => {
      setEffortsPerExercise((prev) => {
        const newEfforts = { ...prev };

        if (!newEfforts[exercise.id]) {
          newEfforts[exercise.id] = {};
        }
        newEfforts[exercise.id][setId] = effort;
        return newEfforts;
      });
    },
    [setEffortsPerExercise, exercise.id],
  );

  const removeEffort = useCallback(
    (setId: string) => {
      setEffortsPerExercise((prev) => {
        const newEfforts = { ...prev };
        if (newEfforts[exercise.id]) {
          // Remove the specific set's effort
          delete newEfforts[exercise.id][setId];

          // Optionally remove the exercise entry if no sets are left
          if (Object.keys(newEfforts[exercise.id]).length === 0) {
            delete newEfforts[exercise.id];
          }
        }

        return newEfforts;
      });
    },
    [exercise.id, setEffortsPerExercise],
  );

  return (
    <div className="main-border-color w-[250px] rounded-lg border p-4">
      <h1>{exercise.name}</h1>
      <ExerciseSetList addEffort={addEffort} removeEffort={removeEffort} sets={exercise.sets} />
    </div>
  );
}
