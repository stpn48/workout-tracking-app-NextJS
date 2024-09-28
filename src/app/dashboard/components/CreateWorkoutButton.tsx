"use client";

import { Button } from "@/app/components/Button";
import { useModalVisibilityStore } from "@/store/modalVisibilityStore";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export function CreateWorkoutButton({ className }: Props) {
  const { setShowCreateWorkoutModal } = useModalVisibilityStore();

  return (
    <Button className={twMerge("", className)} onClick={() => setShowCreateWorkoutModal(true)}>
      Create Workout
    </Button>
  );
}
