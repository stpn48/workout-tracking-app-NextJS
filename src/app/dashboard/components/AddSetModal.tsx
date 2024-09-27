"use client";

import { Button } from "@/app/components/Button";
import { H1 } from "@/app/components/H1";
import { Input } from "@/app/components/Input";
import { ModalBackDrop } from "@/app/components/ModalBackDrop";
import { ModalBody } from "@/app/components/ModalBody";
import React, { useCallback } from "react";
import toast from "react-hot-toast";

type Props = {
  setSets: React.Dispatch<React.SetStateAction<{ name: string; reps: number }[]>>;
  closeModal: () => void;
};

export function AddSetModal({ setSets, closeModal }: Props) {
  const addSet = useCallback((formData: FormData) => {
    const name = formData.get("name") as string;
    const reps = Number(formData.get("reps"));

    if (!name || !reps) {
      toast.error("Please fill out all fields");
      return;
    }

    const newSet = { name, reps };

    setSets((prevSets) => [...prevSets, newSet]);
    closeModal();
  }, []);

  return (
    <ModalBackDrop onClick={closeModal}>
      <ModalBody className="relative h-fit w-fit px-20 py-10 pb-[70px]">
        <form className="flex flex-col gap-2" action={addSet}>
          <H1 className="mb-4 flex w-full justify-center">Add Set</H1>
          <div>
            <label htmlFor="set-name"></label>
            <Input id="set-name" placeholder="Set 1" name="name" />
          </div>
          <div>
            <label htmlFor="set-reps"></label>
            <Input id="set-reps" type="number" placeholder="8" name="reps" />
          </div>
          <Button className="absolute bottom-4 right-4" type="submit">
            Add
          </Button>
        </form>
      </ModalBody>
    </ModalBackDrop>
  );
}
