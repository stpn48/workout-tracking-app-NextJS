"use client";

import { Button } from "@/app/components/Button";
import { useModalVisibilityStore } from "@/store/modalVisibilityStore";
import React, { useCallback } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export function CreateWorkoutButton({ className }: Props) {
  const { setCreateWorkoutModalVisible } = useModalVisibilityStore();

  const handleClick = useCallback(() => {
    setCreateWorkoutModalVisible(true);
  }, [setCreateWorkoutModalVisible]);

  return (
    <Button className={twMerge("", className)} onClick={handleClick}>
      <div>Create Workout</div>
    </Button>
  );
}
