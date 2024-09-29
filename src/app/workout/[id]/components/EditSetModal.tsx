"use client";

import { Button } from "@/app/components/Button";
import { H1 } from "@/app/components/H1";
import { Input } from "@/app/components/Input";
import { ModalBackDrop } from "@/app/components/ModalBackdrop";
import { ModalBody } from "@/app/components/ModalBody";
import React, { useCallback, useTransition } from "react";
import toast from "react-hot-toast";

type Props = {
  closeModal: () => void;
  setSets: React.Dispatch<React.SetStateAction<{ name: string; reps: number }[]>>;
  set: { name: string; reps: number };
  setIndex: number;
};

export function EditSetModal({ closeModal, setSets, set, setIndex }: Props) {
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

  //TODO: Add a confirmation modal when the user tries to close the modal and has unsaved changes

  return (
    <ModalBackDrop onClick={closeModal}>
      <ModalBody className="h-fit w-fit px-20 py-10 text-sm">
        <H1 className="mb-4 flex w-full justify-center">Edit Set</H1>
        <form className="flex flex-col gap-4" action={handleEditSet}>
          <div className="flex flex-col gap-1">
            <label htmlFor="set-name" className="text-secondary">
              Set Name:
            </label>
            <Input
              disabled={editingSet}
              defaultValue={set.name}
              placeholder="Name"
              name="name"
              id="set-name"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="set-reps" className="text-secondary">
              Set Reps:
            </label>
            <Input
              defaultValue={set.reps.toString()}
              disabled={editingSet}
              placeholder="Reps"
              name="reps"
              type="number"
              id="set-reps"
            />
          </div>
          <Button type="submit" disabled={editingSet}>
            Edit Set
          </Button>
          {/* TODO: make this look better */}
          <Button onClick={handleRemoveSet}>Remove Set</Button>
        </form>
      </ModalBody>
    </ModalBackDrop>
  );
}
