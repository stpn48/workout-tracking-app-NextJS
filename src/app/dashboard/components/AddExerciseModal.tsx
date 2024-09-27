"use client";

import { Button } from "@/app/components/Button";
import { H1 } from "@/app/components/H1";
import { Input } from "@/app/components/Input";
import { ModalBackDrop } from "@/app/components/ModalBackDrop";
import { ModalBody } from "@/app/components/ModalBody";
import React, { useCallback, useState, useTransition } from "react";
import { AddSetModal } from "./AddSetModal";
import toast from "react-hot-toast";
import { createExercise } from "@/app/actions/createExercise";
import { useSearchParams } from "next/navigation";

type Set = {
  name: string;
  reps: number;
};

type Props = {
  closeModal: () => void;
};

export function AddExerciseModal({ closeModal }: Props) {
  const searchParams = useSearchParams();

  const [sets, setSets] = useState<Set[]>([]);

  const [isAddingSet, setIsAddingSet] = useState(false);

  const [isCreatingExercise, startCreatingExercise] = useTransition();

  const handleCreateExercise = useCallback(
    (formData: FormData) => {
      const name = formData.get("name") as string;
      const exerciseSets = sets;

      const workoutId = searchParams.get("workoutId");

      if (!workoutId) {
        toast.error("No workout ID found.");
        return;
      }

      if (!name || exerciseSets.length === 0) {
        toast.error("Please fill out all fields and add at least 1 exercise.");
        return;
      }

      toast.loading("Creating exercise...");

      startCreatingExercise(async () => {
        const { error } = await createExercise(name, exerciseSets, workoutId);

        if (error) {
          toast.error(error);
          return;
        }

        toast.dismiss();

        toast.success("Exercise created successfully.");
        closeModal();
      });
    },
    [sets],
  );

  return (
    <>
      <ModalBackDrop onClick={closeModal}>
        <ModalBody className="relative flex h-[50%] w-fit flex-col gap-4 px-20 py-10">
          <H1>Add Exercise</H1>
          <form className="flex flex-col gap-5" action={handleCreateExercise}>
            <div className="flex flex-col gap-1">
              <label htmlFor="exercise-name">Exercise Name:</label>
              <Input id="exercise-name" name="name" placeholder="Best Exercise" />
            </div>

            <div>
              {sets.length === 0 && <p className="text-secondary text-sm">No sets added yet.</p>}
              {sets.map((set) => (
                <div className="main-border-color flex justify-between rounded-lg border px-4 py-2">
                  <h1>{set.name}</h1>
                  <p>{set.reps}</p>
                </div>
              ))}
            </div>

            <Button disabled={isCreatingExercise} onClick={() => setIsAddingSet(true)}>
              Add Set
            </Button>

            <Button type="submit" disabled={isCreatingExercise} className="absolute bottom-4 right-4">
              Add Exercise
            </Button>
          </form>
        </ModalBody>
      </ModalBackDrop>

      {isAddingSet && <AddSetModal setSets={setSets} closeModal={() => setIsAddingSet(false)} />}
    </>
  );
}
