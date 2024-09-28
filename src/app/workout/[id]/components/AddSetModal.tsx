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
};

export function AddSetModal({ closeModal, setSets }: Props) {
  const [addingSet, startAddingSet] = useTransition();

  const handleAddSet = useCallback((formData: FormData) => {
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
  }, []);

  return (
    <ModalBackDrop onClick={closeModal}>
      <ModalBody>
        <H1>Add Set</H1>
        <form action={handleAddSet}>
          <Input disabled={addingSet} placeholder="Name" name="name" />
          <Input disabled={addingSet} placeholder="Reps" name="reps" type="number" />
          <Button type="submit" disabled={addingSet}>
            Add Set
          </Button>
        </form>
      </ModalBody>
    </ModalBackDrop>
  );
}
