"use client";

import { Button } from "@/app/components/Button";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { useRouter } from "next/navigation";
import React, { useCallback, useTransition } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export function CreateWorkoutButton({ className }: Props) {
  const [addingToUrl, startAddingToUrl] = useTransition();

  const router = useRouter();

  const handleClick = useCallback(() => {
    startAddingToUrl(() => {
      router.replace("?creatingWorkout=true");
    });
  }, [router]);

  return (
    <Button className={twMerge("", className)} onClick={handleClick}>
      <div className="flex items-center justify-center gap-2">
        {addingToUrl && <LoadingSpinner className="border-t-black" />}
        <p>CreateWorkout</p>
      </div>
    </Button>
  );
}
