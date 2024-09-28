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
import { checkIsOnDemandRevalidate } from "next/dist/server/api-utils";

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

  const handleAddExercise = useCallback(
    (formData: FormData) => {
      const name = formData.get("name") as string;

      if (!name || sets.length <= 0) {
        console.log(name, sets);
        toast.error("Please fill out all fields");
        return;
      }

      startCreatingExercise(async () => {
        const { error } = await createExercise(name, sets, workoutId);

        if (error) {
          toast.error(error);
          return;
        }

        setSets([]);
        toast.success("Exercise created successfully");
        setShowAddExerciseModal(false);
      });
    },
    [sets],
  );

  const handleCloseModal = useCallback(() => {
    setShowAddExerciseModal(false);
    setSets([]);
  }, []);

  if (!showAddExerciseModal) {
    return null;
  }

  //TODO: Add a confirmation modal when the user tries to close the modal and has unsaved changes

  return (
    <>
      <ModalBackDrop onClick={handleCloseModal}>
        <ModalBody className="h-fit w-fit px-20 py-10 text-sm">
          <H1 className="mb-4">Add Exercise</H1>
          <form className="flex flex-col gap-4" action={handleAddExercise}>
            <div className="flex flex-col gap-1">
              <label className="text-secondary" htmlFor="exercise-name">
                Exercise Name:
              </label>
              <Input disabled={creatingExercise} id="exercise-name" placeholder="Name" name="name" />
            </div>

            <div className="flex flex-col gap-2">
              {sets.length === 0 && <p className="text-secondary flex w-full justify-center text-sm">No sets added...</p>}

              {sets.length > 0 && (
                <div className="text-secondary flex items-center justify-between gap-4 text-xs font-bold uppercase">
                  <h1>SET NUMBER</h1>
                  <h1>SET NAME</h1>
                  <h1>REP COUNT</h1>
                </div>
              )}

              {sets.map((set, index) => (
                //TODO: Add a Set component
                <div className={`${index % 2 === 0 ? "main-bg" : "secondary-bg"} flex items-center justify-between px-4 py-2`}>
                  <h1>{index + 1}.</h1>
                  <h1>{set.name}</h1>
                  <p>{set.reps}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <Button disabled={creatingExercise} variant="secondary" onClick={() => setAddSetModal(true)}>
                Add Set
              </Button>
              <hr className="main-border-color" />
              <Button disabled={creatingExercise} type="submit">
                Add Exercise
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalBackDrop>

      {showAddSetModal && <AddSetModal setSets={setSets} closeModal={() => setAddSetModal(false)} />}
    </>
  );
}
