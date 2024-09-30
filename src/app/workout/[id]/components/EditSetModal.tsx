"use client";

import { Button } from "@/app/components/Button";
import { ConfirmationModal } from "@/app/components/ConfirmationModal";
import { H1 } from "@/app/components/H1";
import { Input } from "@/app/components/Input";
import { InputLabel } from "@/app/components/InputLabel";
import { ModalBackDrop } from "@/app/components/ModalBackdrop";
import { ModalBody } from "@/app/components/ModalBody";
import { SetDetails } from "@/types/type";
import React, { useCallback, useState, useTransition } from "react";
import toast from "react-hot-toast";

type Props = {
  closeModal: () => void;
  setSets: React.Dispatch<React.SetStateAction<SetDetails[]>>;
  set: SetDetails;
  setIndex: number;
};

export function EditSetModal({ closeModal, setSets, set, setIndex }: Props) {
  const [madeChanges, setMadeChanges] = useState(false);
  const [showDiscardChangesConfirmation, setShowDiscardChangesConfirmation] = useState(false);
  const [showRemoveSetConfirmation, setShowRemoveSetConfirmation] = useState(false);

  const [editingSet, startEditingSet] = useTransition();

  const handleEditSet = useCallback((formData: FormData) => {
    const name = formData.get("name") as string;
    const reps = Number(formData.get("reps"));

    if (!name || !reps) {
      toast.error("Please fill out all fields");
      return;
    }

    startEditingSet(() => {
      setSets((prevSets) => {
        const newSets = [...prevSets];
        newSets[setIndex] = { name, reps };
        return newSets;
      });
      closeModal();
    });
  }, []);

  const handleRemoveSet = useCallback(() => {
    setSets((prevSets) => {
      const newSets = [...prevSets];
      newSets.splice(setIndex, 1);
      return newSets;
    });
    closeModal();
  }, []);

  const handleCloseModal = useCallback(() => {
    if (madeChanges) {
      setShowDiscardChangesConfirmation(true);
      return;
    }

    closeModal();
  }, [madeChanges]);

  //TODO: Add a confirmation modal when the user tries to close the modal and has unsaved changes

  return (
    <>
      <ModalBackDrop onClick={handleCloseModal}>
        <ModalBody className="h-fit w-fit p-10 text-sm">
          <H1 className="mb-4 flex w-full justify-center">Edit Set</H1>
          <form className="flex flex-col gap-4" action={handleEditSet}>
            <div className="mb-2 flex flex-col gap-1">
              <label htmlFor="set-name" className="text-secondary">
                Set Name:
              </label>
              <Input
                onChange={() => setMadeChanges(true)}
                disabled={editingSet}
                defaultValue={set.name}
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
                defaultValue={set.reps.toString()}
                disabled={editingSet}
                placeholder="Reps"
                name="reps"
                type="number"
                id="set-reps"
              />
            </div>

            <div className="flex flex-row-reverse justify-center gap-2">
              <Button type="submit" disabled={editingSet}>
                Save
              </Button>
              <Button variant="danger" onClick={() => setShowRemoveSetConfirmation(true)}>
                Remove Set
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalBackDrop>

      {showDiscardChangesConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to discard all changes?"
          onCancel={() => setShowDiscardChangesConfirmation(false)}
          onConfirm={closeModal}
        />
      )}
      {showRemoveSetConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to remove this set?"
          onConfirm={handleRemoveSet}
          onCancel={() => setShowRemoveSetConfirmation(false)}
        />
      )}
    </>
  );
}
