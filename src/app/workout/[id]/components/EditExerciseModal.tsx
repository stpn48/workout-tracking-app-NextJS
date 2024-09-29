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
import { useQueryClient } from "@tanstack/react-query";
import { EditSetModal } from "./EditSetModal";
import { useExerciseDetails } from "@/hooks/useExerciseDetails";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { updateExerciseDetails } from "@/app/actions/updateExerciseDetails";

type Props = {
  workoutId: string;
  exerciseId: string;
};

type Set = {
  name: string;
  reps: number;
};

//TODO: make this reusable with the AddExerciseModal
export function EditExerciseModal({ exerciseId, workoutId }: Props) {
  const { showEditExerciseModal, setShowEditExerciseModal, showEditSetModal, setShowEditSetModal } =
    useModalVisibilityStore();

  const queryClient = useQueryClient();

  const [sets, setSets] = useState<Set[]>([]);
  const [showAddSetModal, setAddSetModal] = useState(false);
  const [currEditingSetIndex, setCurrEditingSetIndex] = useState<number | null>(null);

  const [updatingExercise, startUpdatingExercise] = useTransition();

  const { data: exerciseDetails, isLoading } = useExerciseDetails({
    exerciseId,
    workoutId,
    onSuccess: () => setSets(exerciseDetails!.sets),
  });

  const handleUpdateExercise = useCallback(
    (formData: FormData) => {
      const name = formData.get("name") as string;

      if (!name || sets.length <= 0) {
        toast.error("Please enter a name for the exercise");
        return;
      }

      startUpdatingExercise(async () => {
        try {
          await updateExerciseDetails(exerciseId, workoutId, name, sets);
          queryClient.invalidateQueries({
            queryKey: ["workoutExercises", { workoutId }],
          });
          toast.success("Exercise updated successfully");
          handleCloseModal();
        } catch (e) {
          toast.error("Failed to update exercise");
        }
      });
    },
    [sets],
  );

  const handleCloseModal = useCallback(() => {
    setShowEditExerciseModal(false);
    setSets([]);
  }, []);

  const handleSetClick = useCallback((index: number) => {
    setShowEditSetModal(true);
    setCurrEditingSetIndex(index);
  }, []);

  if (!showEditExerciseModal) {
    return null;
  }

  if (isLoading || !exerciseDetails) {
    // TODO: make better loading UI
    return (
      <div className="fixed inset-0 flex h-screen w-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  //TODO: Add a confirmation modal when the user tries to close the modal and has unsaved changes

  return (
    <>
      <ModalBackDrop onClick={handleCloseModal}>
        <ModalBody className="h-fit w-fit px-20 py-10 text-sm">
          <H1 className="mb-4">Edit Exercise</H1>
          <form className="flex flex-col gap-4" action={handleUpdateExercise}>
            <div className="flex flex-col gap-1">
              <label className="text-secondary" htmlFor="exercise-name">
                Exercise Name:
              </label>
              <Input
                defaultValue={exerciseDetails.name}
                disabled={updatingExercise}
                id="exercise-name"
                placeholder="Name"
                name="name"
              />
            </div>

            {/* TODO: make this a separate component for better readability */}
            <div className="flex flex-col gap-2">
              {sets.length === 0 && (
                <p className="text-secondary flex w-full justify-center text-sm">
                  No sets added...
                </p>
              )}

              {sets.length > 0 && (
                <div className="text-secondary flex items-center justify-between gap-4 text-xs font-bold uppercase">
                  <h1>SET NUMBER</h1>
                  <h1>SET NAME</h1>
                  <h1>REP COUNT</h1>
                </div>
              )}

              {sets.map((set, index) => (
                //TODO: Add a Set component
                <div
                  onClick={() => handleSetClick(index)}
                  className={`${index % 2 === 0 ? "main-bg" : "secondary-bg"} flex cursor-pointer items-center justify-between rounded-lg px-4 py-2`}
                >
                  <h1>{index + 1}.</h1>
                  <h1>{set.name}</h1>
                  <p>{set.reps}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <Button
                disabled={updatingExercise}
                variant="secondary"
                onClick={() => setAddSetModal(true)}
              >
                Add Set
              </Button>
              <hr className="main-border-color" />
              <Button disabled={updatingExercise} type="submit">
                Edit Exercise
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
    </>
  );
}
