"use client";

import { createWorkout } from "@/app/actions/createWorkout";
import { Button } from "@/app/components/Button";
import { H1 } from "@/app/components/H1";
import { Input } from "@/app/components/Input";
import { ModalBackDrop } from "@/app/components/ModalBackdrop";
import { ModalBody } from "@/app/components/ModalBody";
import { useModalVisibilityStore } from "@/store/modalVisibilityStore";
import React, { useCallback, useTransition } from "react";
import toast from "react-hot-toast";

export function CreateWorkoutModal() {
  const { showCreateWorkoutModal, setShowCreateWorkoutModal } = useModalVisibilityStore();

  const [isCreatingWorkout, startCreatingWorkout] = useTransition();

  const handleCreateWorkout = useCallback((formData: FormData) => {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const estimatedTime = formData.get("estimated-time") as string;

    if (!name || !description || !estimatedTime) {
      toast.error("Please fill out all fields");
      return;
    }

    startCreatingWorkout(async () => {
      await createWorkout(formData);

      toast.success("Workout created successfully");
      setShowCreateWorkoutModal(false);
    });
  }, []);

  if (!showCreateWorkoutModal) {
    return null;
  }

  //TODO: Play with design, add X button to close modal

  return (
    <ModalBackDrop onClick={() => setShowCreateWorkoutModal(false)}>
      <ModalBody className="flex h-fit w-fit flex-col gap-4 px-20 py-10">
        <H1>Create Workout</H1>
        <form className="text-secondary flex flex-col gap-2 text-sm" action={handleCreateWorkout}>
          <div className="flex flex-col gap-1">
            <label htmlFor="workout-name">Name:</label>
            <Input
              disabled={isCreatingWorkout}
              id="workout-name"
              placeholder="Back workout"
              name="name"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="workout-description">Description:</label>
            <Input
              id="workout-description"
              disabled={isCreatingWorkout}
              placeholder="Heavily focused on the back muscles"
              name="description"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="workout-estimated-time">Estimated Time:</label>
            <div className="flex items-center gap-2">
              <Input
                id="workout-estimated-time"
                disabled={isCreatingWorkout}
                type="number"
                placeholder="60"
                name="estimated-time"
              />
              <p>Minutes</p>
            </div>
          </div>

          <Button className="mt-4" disabled={isCreatingWorkout} type="submit">
            Create Workout
          </Button>
        </form>
      </ModalBody>
    </ModalBackDrop>
  );
}
