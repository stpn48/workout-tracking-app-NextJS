"use client";

import { ExerciseDetails } from "@/types/type";
import React, { useCallback, useState } from "react";
import { ExerciseSetList } from "./ExerciseSetList";

type Props = {
  exercise: ExerciseDetails;
  setEffortsPerExercise: React.Dispatch<React.SetStateAction<{ [exerciseId: string]: number[] }>>;
};

export function LogExerciseCard({ exercise, setEffortsPerExercise }: Props) {
  const pushEffort = useCallback(
    (effort: number) => {
      setEffortsPerExercise((prev) => {
        const newEfforts = { ...prev };
        newEfforts[exercise.id] = [...(newEfforts[exercise.id] || []), effort];
        return newEfforts;
      });
    },
    [setEffortsPerExercise],
  );

  return (
    <div className="main-border-color w-[250px] rounded-lg border p-4">
      <h1>{exercise.name}</h1>
      <ExerciseSetList pushEffort={pushEffort} sets={exercise.sets} />
    </div>
  );
}
