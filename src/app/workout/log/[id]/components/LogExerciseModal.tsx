"use client";

import { H1 } from "@/app/components/H1";
import { ExerciseDetails, LoggedExercise } from "@/types/type";
import React, { useCallback, useEffect, useState } from "react";
import { LogSetModal } from "./LogSetModal";

type Props = {
  exercises: ExerciseDetails[];
};

export function LogExerciseModal({ exercises }: Props) {
  const [currLoggingExerciseIndex, setCurrLoggingExerciseIndex] = useState(0);
  const [loggedExercises, setLoggedExercises] = useState<LoggedExercise[]>([]);

  const handleFinishClick = useCallback(() => {
    console.log(loggedExercises);
  }, []);

  return (
    <div className="fixed inset-0 flex h-screen w-screen flex-col items-center justify-center">
      <div className="mb-4 flex flex-col justify-start">
        <p className="text-secondary text-xs font-bold uppercase">
          Exercise {currLoggingExerciseIndex + 1}
        </p>
        <H1>{exercises[currLoggingExerciseIndex].name}</H1>
      </div>
      <LogSetModal
        handleFinishClick={handleFinishClick}
        isLastExercise={currLoggingExerciseIndex === exercises.length - 1}
        exerciseName={exercises[currLoggingExerciseIndex].name}
        setCurrLoggingExerciseIndex={setCurrLoggingExerciseIndex}
        setLoggedExercises={setLoggedExercises}
        sets={exercises[currLoggingExerciseIndex].sets}
      />
    </div>
  );
}
