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
        <form className="flex flex-col gap-2" action={handleCreateWorkout}>
          <Input disabled={isCreatingWorkout} placeholder="Name" name="name" />
          <Input disabled={isCreatingWorkout} placeholder="Description" name="description" />
          <Input disabled={isCreatingWorkout} type="number" placeholder="Estimated Time" name="estimated-time" />
          <Button disabled={isCreatingWorkout} type="submit">
            Create Workout
          </Button>
        </form>
      </ModalBody>
    </ModalBackDrop>
  );
}
