"use client";

import { CompletedExercise } from "@prisma/client";
import { useState } from "react";
import MoreDetailsModal from "./MoreDetailsModal";

type Props = {
  exerciseName: string;
  completedExercise: CompletedExercise;
};

export function CompletedExerciseCard({ exerciseName, completedExercise }: Props) {
  const [showMoreDetailsModal, setShowMoreDetailsModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowMoreDetailsModal(true)}
        className="main-border-color w-fit cursor-pointer rounded-lg border p-4 text-white"
      >
        <h1 className="font-bold">{exerciseName}</h1>
        <h1>times completed: {completedExercise.timesCompleted}</h1>
      </div>

      {showMoreDetailsModal && (
        <MoreDetailsModal
          completedExercise={completedExercise}
          exerciseName={exerciseName}
          closeModal={() => setShowMoreDetailsModal(false)}
        />
      )}
    </>
  );
}
