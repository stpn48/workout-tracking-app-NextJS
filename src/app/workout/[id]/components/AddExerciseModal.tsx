"use client";

import { Button } from "@/app/components/Button";
import { H1 } from "@/app/components/H1";
import { Input } from "@/app/components/Input";
import { ModalBackDrop } from "@/app/components/ModalBackdrop";
import { ModalBody } from "@/app/components/ModalBody";
import { useModalVisibilityStore } from "@/store/modalVisibilityStore";
import React, { useCallback, useState, useTransition } from "react";
import { AddSetModal } from "./AddSetModal";
import toast from "react-hot-toast";
import { createExercise } from "@/app/actions/createExercise";

type Props = {
  workoutId: string;
};

type Set = {
  name: string;
  reps: number;
};

export function AddExerciseModal({ workoutId }: Props) {
  const { showAddExerciseModal, setShowAddExerciseModal } = useModalVisibilityStore();

  const [sets, setSets] = useState<Set[]>([]);
  const [showAddSetModal, setAddSetModal] = useState(false);

  const [creatingExercise, startCreatingExercise] = useTransition();

  const handleAddExercise = useCallback((formData: FormData) => {
    const name = formData.get("name") as string;

    if (!name || sets.length <= 0) {
      toast.error("Please fill out all fields");
      return;
    }

    startCreatingExercise(async () => {
      const { error } = await createExercise(name, sets, workoutId);

      if (error) {
        toast.error(error);
        return;
      }

      toast.success("Exercise created successfully");
      setShowAddExerciseModal(false);
    });
  }, []);

  if (!showAddExerciseModal) {
    return null;
  }

  return (
    <>
      <ModalBackDrop onClick={() => setShowAddExerciseModal(false)}>
        <ModalBody>
          <H1>Add Exercise</H1>
          <form action={handleAddExercise}>
            <Input disabled={creatingExercise} placeholder="Name" name="name" />

            <div className="flex flex-col gap-2">
              {sets.map((set) => (
                //TODO: Add a Set component
                <div className="flex items-center justify-between px-4 py-2">
                  <h1>{set.name}</h1>
                  <p>{set.reps}</p>
                </div>
              ))}
            </div>

            <Button disabled={creatingExercise} onClick={() => setAddSetModal(true)}>
              Add Set
            </Button>
            <Button disabled={creatingExercise} type="submit">
              Add Exercise
            </Button>
          </form>
        </ModalBody>
      </ModalBackDrop>

      {showAddSetModal && <AddSetModal setSets={setSets} closeModal={() => setAddSetModal(false)} />}
    </>
  );
}
