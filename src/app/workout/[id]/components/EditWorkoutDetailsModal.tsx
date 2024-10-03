"use client";

import { createWorkout } from "@/app/actions/createWorkout";
import { updateWorkoutDetails } from "@/app/actions/updateWorkoutDetails";
import { Button } from "@/app/components/Button";
import { H1 } from "@/app/components/H1";
import { Input } from "@/app/components/Input";
import { ModalBackDrop } from "@/app/components/ModalBackdrop";
import { ModalBody } from "@/app/components/ModalBody";
import { useModalVisibilityStore } from "@/store/modalVisibilityStore";
import { Workout } from "@prisma/client";
import React, { useCallback, useTransition } from "react";
import toast from "react-hot-toast";

type Props = {
  workoutDetails: Workout;
};

export function EditWorkoutDetailsModal({ workoutDetails }: Props) {
  const { showEditWorkoutDetailsModal, setShowEditWorkoutDetailModal } = useModalVisibilityStore();

  const [isUpdatingWorkout, startUpdatingWorkout] = useTransition();

  const handleEditWorkoutDetails = useCallback((formData: FormData) => {
    const newName = formData.get("name") as string;
    const newDescription = formData.get("description") as string;
    const newEstimatedTime = formData.get("estimated-time") as string;

    if (!newName || !newDescription || !newEstimatedTime) {
      toast.error("Please fill in all fields");
      return;
    }

    startUpdatingWorkout(async () => {
      const { error } = await updateWorkoutDetails({
        newName,
        newDescription,
        newEstimatedTime: newEstimatedTime,
        workoutId: workoutDetails.id,
      });

      if (error) {
        toast.error(error);
        return;
      }

      toast.success("Workout updated successfully");
      setShowEditWorkoutDetailModal(false);
    });
  }, []);

  if (!showEditWorkoutDetailsModal) {
    return null;
  }

  //TODO: Play with design, add X button to close modal

  return (
    <ModalBackDrop onClick={() => setShowEditWorkoutDetailModal(false)}>
      <ModalBody
        closeModal={() => setShowEditWorkoutDetailModal(false)}
        className="flex h-fit w-fit flex-col gap-4 px-20 py-10"
      >
        <H1>Edit Workout Details</H1>
        <form
          className="text-secondary flex flex-col gap-2 text-sm"
          action={handleEditWorkoutDetails}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="workout-name">Name:</label>
            <Input
              disabled={isUpdatingWorkout}
              id="workout-name"
              placeholder="Chest workout"
              name="name"
              defaultValue={workoutDetails.name}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="workout-description">Description:</label>
            <Input
              id="workout-description"
              disabled={isUpdatingWorkout}
              placeholder="Crazy workout"
              name="description"
              defaultValue={workoutDetails.description || ""}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="workout-estimated-time">Estimated Time:</label>
            <div className="flex items-center gap-2">
              <Input
                id="workout-estimated-time"
                disabled={isUpdatingWorkout}
                type="number"
                placeholder="45"
                name="estimated-time"
                defaultValue={workoutDetails.estimated_time.toString()}
              />
              <p>Minutes</p>
            </div>
          </div>

          <Button className="mt-4" disabled={isUpdatingWorkout} type="submit">
            Edit Workout
          </Button>
        </form>
      </ModalBody>
    </ModalBackDrop>
  );
}
