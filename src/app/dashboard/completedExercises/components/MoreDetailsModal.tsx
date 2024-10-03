import { ModalBackDrop } from "@/app/components/ModalBackdrop";
import { ModalBody } from "@/app/components/ModalBody";
import { CompletedExercise } from "@prisma/client";
import React from "react";

type Props = {
  completedExercise: CompletedExercise;
  closeModal: () => void;
};

export default function MoreDetailsModal({ completedExercise, closeModal }: Props) {
  return (
    <ModalBackDrop onClick={closeModal}>
      <ModalBody closeModal={closeModal} className="text-white">
        <h1>{completedExercise.name}</h1>
        <h1>times completed: {completedExercise.timesCompleted}</h1>
        {/* TODO: add a graph */}
        <h1>effort history: {JSON.stringify(completedExercise.maxRepsHistory)}</h1>
      </ModalBody>
    </ModalBackDrop>
  );
}
