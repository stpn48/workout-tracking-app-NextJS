"use client";

import { Button } from "@/app/components/Button";
import { H1 } from "@/app/components/H1";
import { Input } from "@/app/components/Input";
import { ModalBackDrop } from "@/app/components/ModalBackdrop";
import { ModalBody } from "@/app/components/ModalBody";
import React, { useCallback, useEffect, useState, useTransition } from "react";
import { AddSetModal } from "./AddSetModal";
import { EditSetModal } from "./EditSetModal";
import { SetDetails } from "@/types/type";
import { SetList } from "./SetList";
import { removeExercise } from "@/app/actions/removeExercise";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ConfirmationModal } from "@/app/components/ConfirmationModal";

type Props = {
  submitFn: (formData: FormData, sets: SetDetails[]) => void;
  closeModal: () => void;
  isPending?: boolean;
  initialSets?: SetDetails[];
  initialName?: string;
  exerciseId: string;
  title: string;
  workoutId: string;
  finalButtonText: string;
  removeButton?: boolean;
};

export function ExerciseModal({
  submitFn,
  closeModal,
  isPending,
  initialName,
  initialSets,
  title,
  finalButtonText,
  exerciseId,
  workoutId,
  removeButton,
}: Props) {
  const [sets, setSets] = useState<SetDetails[]>(initialSets || []);
  const [showAddSetModal, setAddSetModal] = useState(false);
  const [showEditSetModal, setShowEditSetModal] = useState(false);
  const [currEditingSetIndex, setCurrEditingSetIndex] = useState<number | null>(null);
  const [madeChanges, setMadeChanges] = useState(false);
  const [showRemoveExerciseConfirmation, setShowRemoveExerciseConfirmation] = useState(false);
  const [showDiscardChangesConfirmation, setShowDiscardChangesConfirmation] = useState(false);

  const [removingExercise, startRemovingExercise] = useTransition();

  const queryClient = useQueryClient();

  const handleSubmit = useCallback(
    (formData: FormData) => {
      submitFn(formData, sets);
    },
    [sets],
  );

  const handleRemoveExercise = useCallback(() => {
    toast.loading("Removing exercise...");
    startRemovingExercise(async () => {
      await removeExercise(exerciseId, workoutId);

      queryClient.invalidateQueries({
        queryKey: ["workoutExercises", { workoutId }],
      });

      toast.dismiss();

      toast.success("Exercise removed successfully");

      closeModal();
    });
  }, []);

  const handleCloseModal = useCallback(() => {
    if (madeChanges) {
      setShowDiscardChangesConfirmation(true);
      return;
    }

    closeModal();
  }, [madeChanges]);

  const handleSetClick = useCallback((index: number) => {
    setShowEditSetModal(true);
    setCurrEditingSetIndex(index);
  }, []);

  //TODO: Add a confirmation modal when the user tries to close the modal and has unsaved changes

  return (
    <>
      <ModalBackDrop onClick={handleCloseModal}>
        <ModalBody className="relative h-fit w-fit p-10 text-sm">
          <H1 className="mb-4">{title}</H1>
          <form className="flex flex-col gap-8" action={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label className="text-secondary" htmlFor="exercise-name">
                Exercise Name:
              </label>
              <Input
                onChange={() => setMadeChanges(true)}
                disabled={isPending}
                defaultValue={initialName}
                id="exercise-name"
                placeholder="Name"
                name="name"
              />
            </div>

            <SetList sets={sets} handleSetClick={handleSetClick} />

            <Button disabled={isPending} variant="secondary" onClick={() => setAddSetModal(true)}>
              Add Set
            </Button>

            <hr className="border-[#444444]" />

            <div className="flex justify-center gap-2">
              {removeButton && (
                <Button
                  variant="danger"
                  onClick={() => setShowRemoveExerciseConfirmation(true)}
                  disabled={isPending}
                >
                  Remove
                </Button>
              )}
              <Button disabled={isPending} type="submit">
                {finalButtonText}
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalBackDrop>

      {showAddSetModal && (
        <AddSetModal setSets={setSets} closeModal={() => setAddSetModal(false)} />
      )}

      {showEditSetModal && (
        <EditSetModal
          set={sets[currEditingSetIndex!]}
          closeModal={() => setShowEditSetModal(false)}
          setIndex={currEditingSetIndex!}
          setSets={setSets}
        />
      )}

      {showRemoveExerciseConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to remove this exercise?"
          onConfirm={handleRemoveExercise}
          onCancel={() => setShowRemoveExerciseConfirmation(false)}
        />
      )}

      {showDiscardChangesConfirmation && (
        <ConfirmationModal
          onCancel={() => setShowDiscardChangesConfirmation(false)}
          message="Are you sure you want to discard all changes?"
          onConfirm={closeModal}
        />
      )}
    </>
  );
}
