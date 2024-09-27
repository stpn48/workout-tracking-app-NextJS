"use client";

import { Button } from "@/app/components/Button";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { ModalBackDrop } from "@/app/components/ModalBackDrop";
import { ModalBody } from "@/app/components/ModalBody";
import { getWorkoutDetails } from "@/hooks/getWorkoutDetails";
import { useModalVisibilityStore } from "@/store/modalVisiblityStore";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { AddExerciseModal } from "./AddExerciseModal";

export function EditWorkoutModal() {
  const { editWorkoutModalVisible, setEditWorkoutModalVisibilityVisible } = useModalVisibilityStore();

  const searchParams = useSearchParams();
  const router = useRouter();

  const workoutId = useMemo(() => searchParams.get("workoutId"), [searchParams]);

  const { workoutDetails, gettingWorkoutDetails } = getWorkoutDetails(workoutId, editWorkoutModalVisible);

  const [addExerciseModalVisible, setAddExerciseModalVisible] = useState(false);

  const handleAddExerciseClick = useCallback(() => {
    setAddExerciseModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setEditWorkoutModalVisibilityVisible(false);
    router.replace("/dashboard");
  }, [router]);

  // loading modal
  if (gettingWorkoutDetails || !workoutDetails) {
    return (
      <ModalBackDrop>
        <ModalBody className="flex p-0">
          <section className="main-border-color w-[30%] rounded-bl-lg rounded-tl-lg border-b border-l border-t bg-black p-4">
            <LoadingSpinner />
          </section>
          <section className="main-border-color flex flex-grow border-b border-r border-t"></section>
        </ModalBody>
      </ModalBackDrop>
    );
  }

  return (
    <>
      <ModalBackDrop onClick={closeModal}>
        <ModalBody className="relative flex p-0">
          <section className="main-border-color flex w-[30%] flex-col gap-4 rounded-bl-lg rounded-tl-lg border-b border-l border-t bg-black p-4 text-base">
            <h1 className="text-lg">{workoutDetails.name}</h1>
            <p className="text-secondary">{workoutDetails.description}</p>
            <p>{workoutDetails.estimated_time} min to complete</p>
          </section>
          <section className="main-border-color flex flex-grow rounded-br-lg rounded-tr-lg border-b border-r border-t p-5">
            <div className="flex flex-wrap gap-2">
              {workoutDetails.exercises.map((exercise) => (
                <div key={exercise.id} className="main-border-color h-fit rounded-lg border bg-black p-4">
                  <h1>{exercise.name}</h1>
                </div>
              ))}
            </div>

            <Button className="absolute right-4 top-4" onClick={handleAddExerciseClick}>
              Add Exercise
            </Button>
          </section>
        </ModalBody>
      </ModalBackDrop>

      {addExerciseModalVisible && <AddExerciseModal closeModal={() => setAddExerciseModalVisible(false)} />}
    </>
  );
}
