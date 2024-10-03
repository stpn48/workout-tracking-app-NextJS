"use client";

import { CompletedExercise } from "@prisma/client";
import { useState } from "react";
import MoreDetailsModal from "./MoreDetailsModal";

type Props = {
  completedExercise: CompletedExercise;
};

export function CompletedExerciseCard({ completedExercise }: Props) {
  const [showMoreDetailsModal, setShowMoreDetailsModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowMoreDetailsModal(true)}
        className="main-border-color secondary-bg w-fit cursor-pointer rounded-lg border p-4 text-sm text-white"
      >
        <h1 className="text-base">{completedExercise.name}</h1>
        <h1>times completed: {completedExercise.timesCompleted}</h1>
      </div>

      {showMoreDetailsModal && (
        <MoreDetailsModal
          completedExercise={completedExercise}
          closeModal={() => setShowMoreDetailsModal(false)}
        />
      )}
    </>
  );
}
