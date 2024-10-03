import { ModalBackDrop } from "@/app/components/ModalBackdrop";
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
        <h1>{completedExercise.name}</h1>
        <h1>times completed: {completedExercise.timesCompleted}</h1>
        <div className="mt-10 flex flex-col gap-4">
          <h1 className="flex w-full justify-center text-xl font-bold">Your progress chart</h1>

          <ProgressChart effortHistory={completedExercise.maxRepsHistory} />
        </div>
      </ModalBody>
    </ModalBackDrop>
  );
}
