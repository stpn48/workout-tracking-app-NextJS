"use client";

import { Button } from "@/app/components/Button";
import { ConfirmationModal } from "@/app/components/ConfirmationModal";
import { H1 } from "@/app/components/H1";
import { Input } from "@/app/components/Input";
import { ModalBackDrop } from "@/app/components/ModalBackdrop";
import { ModalBody } from "@/app/components/ModalBody";
import { SetDetails } from "@/types/type";
import React, { useCallback, useState, useTransition } from "react";
import toast from "react-hot-toast";

type Props = {
  closeModal: () => void;
  setSets: React.Dispatch<React.SetStateAction<SetDetails[]>>;
};

export function AddSetModal({ closeModal, setSets }: Props) {
  const [madeChanges, setMadeChanges] = useState(false);
  const [showDiscardChangesConfirmation, setShowDiscardChangesConfirmation] = useState(false);

  const [addingSet, startAddingSet] = useTransition();

  const handleAddSet = useCallback(
    (formData: FormData) => {
      const name = formData.get("name") as string;
      const reps = Number(formData.get("reps"));

      if (!name || !reps) {
        toast.error("Please fill out all fields");
        return;
      }

      startAddingSet(() => {
        setSets((prevSets) => [...prevSets, { name, reps }]);
        closeModal();
      });
    },
    [closeModal, setSets],
  );

  const handleCloseModal = useCallback(() => {
    if (madeChanges) {
      setShowDiscardChangesConfirmation(true);
      return;
    }

    closeModal();
  }, [madeChanges, closeModal]);

  //TODO: Add a confirmation modal when the user tries to close the modal and has unsaved changes

  return (
    <>
      <ModalBackDrop onClick={handleCloseModal}>
        <ModalBody closeModal={handleCloseModal} className="relative h-fit w-fit p-10 text-sm">
          <H1 className="mb-4 flex w-full justify-center">Add Set</H1>
          <form className="flex flex-col gap-4" action={handleAddSet}>
            <div className="flex flex-col gap-1">
              <label htmlFor="set-name" className="text-secondary">
                Set Name:
              </label>
              <Input
                disabled={addingSet}
                onChange={() => setMadeChanges(true)}
                placeholder="Name"
                name="name"
                id="set-name"
              />
            </div>

            <div className="mb-2 flex flex-col gap-1">
              <label htmlFor="set-reps" className="text-secondary">
                Set Reps:
              </label>
              <Input
                onChange={() => setMadeChanges(true)}
                disabled={addingSet}
                placeholder="Reps"
                name="reps"
                type="number"
                id="set-reps"
              />
            </div>

            <Button type="submit" disabled={addingSet}>
              Add Set
            </Button>
          </form>
        </ModalBody>
      </ModalBackDrop>

      {showDiscardChangesConfirmation && (
        <ConfirmationModal
          onCancel={() => setShowDiscardChangesConfirmation(false)}
          onConfirm={closeModal}
          message="You have unsaved changes. Are you sure you want to discard them?"
        />
      )}
    </>
  );
}
