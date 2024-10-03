import { ModalBackDrop } from "@/app/components/ModalBackDrop";
import { ModalBody } from "@/app/components/ModalBody";
import { CompletedExercise } from "@prisma/client";
import React from "react";
import ProgressChart from "./ProgeessChart";

type Props = {
  completedExercise: CompletedExercise;
  closeModal: () => void;
};

export default function MoreDetailsModal({ completedExercise, closeModal }: Props) {
  return (
    <ModalBackDrop onClick={closeModal}>
      <ModalBody closeModal={closeModal} className="text-white">
        <h1 className="text-lg">{completedExercise.name}</h1>
        <h1>times completed: {completedExercise.timesCompleted}</h1>
        <div className="mt-20 flex flex-col gap-4">
          <h1 className="text-secondary mb-10 flex w-full justify-center text-xs font-bold uppercase">
            Your progress chart
          </h1>

          <ProgressChart effortHistory={completedExercise.maxRepsHistory} />
        </div>
      </ModalBody>
    </ModalBackDrop>
  );
}
