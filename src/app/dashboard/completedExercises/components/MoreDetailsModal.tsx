import { ModalBackDrop } from "@/app/components/ModalBackdrop";
import { ModalBody } from "@/app/components/ModalBody";
import { CompletedExercise } from "@prisma/client";
import React from "react";

type Props = {
  completedExercise: CompletedExercise;
  exerciseName: string;
  closeModal: () => void;
};

export default function MoreDetailsModal({ completedExercise, exerciseName, closeModal }: Props) {
  return (
    <ModalBackDrop onClick={closeModal}>
      <ModalBody className="text-white">
        <h1>{exerciseName}</h1>
        <h1>times completed: {completedExercise.timesCompleted}</h1>
        {/* TODO: add a graph */}
        <h1>effort history: {JSON.stringify(completedExercise.maxRepsHistory)}</h1>
      </ModalBody>
    </ModalBackDrop>
  );
}
