"use client";

import { Button } from "@/app/components/Button";
import { useModalVisibilityStore } from "@/store/modalVisibilityStore";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export function EditWorkoutDetailsButton({ className }: Props) {
  const { setEditWorkoutDetailModal } = useModalVisibilityStore();

  return (
    <Button variant="secondary" className={twMerge("", className)} onClick={() => setEditWorkoutDetailModal(true)}>
      Edit Workout Details
    </Button>
  );
}
