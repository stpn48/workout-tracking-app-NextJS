import React from "react";
import { EditWorkoutModal } from "./EditWorkoutModal";
import { findWorkoutDetails } from "@/app/actions/findWorkoutDetails";
import { ErrorHandler } from "@/app/components/ErrorHandler";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { ModalBackDrop } from "@/app/components/ModalBackDrop";
import { ModalBody } from "@/app/components/ModalBody";

type Props = {
  workoutId: string;
};

export async function WorkoutDetailsProvider({ workoutId }: Props) {
  //TODO: Get workout details on server, pass search params from parent page

  if (!workoutId) {
    return (
      <ModalBackDrop>
        <ModalBody className="relative flex p-0">
          <LoadingSpinner />
        </ModalBody>
      </ModalBackDrop>
    );
  }

  const { error, data: workoutDetails } = await findWorkoutDetails(workoutId);

  return (
    <>
      <ErrorHandler error={error} successMsg="Workout details loaded" />
      <EditWorkoutModal workoutDetails={workoutDetails} />
    </>
  );
}
