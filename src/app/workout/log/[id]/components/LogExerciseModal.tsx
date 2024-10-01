"use client";

import { H1 } from "@/app/components/H1";
import { ModalBackDrop } from "@/app/components/ModalBackdrop";
import { ExerciseDetails } from "@/types/type";
import React, { useState } from "react";
import { LogSetModal } from "./LogSetModal";

type Props = {
  exercises: ExerciseDetails[];
};

export function LogExerciseModal({ exercises }: Props) {
  const [currLoggingExerciseIndex, setCurrLoggingExerciseIndex] = useState(0);
  const [loggedExercises, setLoggedExercises] = useState([]);

  return (
    <ModalBackDrop className="flex flex-col">
      <div className="mb-4 flex flex-col justify-start">
        <p className="text-secondary text-xs font-bold uppercase">
          Exercise {currLoggingExerciseIndex + 1}
        </p>
        <H1>{exercises[currLoggingExerciseIndex].name}</H1>
      </div>
      <LogSetModal
        setCurrLoggingExerciseIndex={setCurrLoggingExerciseIndex}
        setLoggedExercises={setLoggedExercises}
        sets={exercises[currLoggingExerciseIndex].sets}
      />
    </ModalBackDrop>
  );
}
