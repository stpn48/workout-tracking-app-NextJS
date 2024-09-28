"use client";

import { Button } from "@/app/components/Button";
import { useModalVisibilityStore } from "@/store/modalVisibilityStore";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export function AddExerciseButton({ className }: Props) {
  const { setShowAddExerciseModal } = useModalVisibilityStore();

  return (
    <Button className={twMerge("", className)} onClick={() => setShowAddExerciseModal(true)}>
      Add Exercise
    </Button>
  );
}
