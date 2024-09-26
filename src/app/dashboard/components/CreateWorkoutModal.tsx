"use client";

import { createWorkout } from "@/app/actions/createWorkout";
import { Button } from "@/app/components/Button";
import { H1 } from "@/app/components/H1";
import { Input } from "@/app/components/Input";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { ModalBackDrop } from "@/app/components/ModalBackDrop";
import { ModalBody } from "@/app/components/ModalBody";
import { Select } from "@/app/components/Select";
import { Difficulty } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback, useTransition } from "react";
import toast from "react-hot-toast";

export function CreateWorkoutModal() {
  const router = useRouter();

  const [isCreatingWorkout, startCreatingWorkout] = useTransition();

  const handleCreateWorkout = useCallback((formData: FormData) => {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const estimatedTime = formData.get("estimatedTime") as string;
    const difficulty = formData.get("difficulty") as Difficulty;

    if (!name || !description || !estimatedTime || !difficulty) {
      toast.error("Please fill out all fields");
      return;
    }

    try {
      parseInt(estimatedTime);
    } catch {
      toast.error("Estimated time must be a number");
      return;
    }

    startCreatingWorkout(async () => {
      const { error } = await createWorkout(formData);

      if (error) {
        toast.error(error);
        return;
      }
    });

    toast.success("Workout created successfully");
    handleModalClose();
  }, []);

  const handleModalClose = useCallback(() => {
    router.replace("/dashboard");
  }, [router]);

  return (
    <ModalBackDrop onClick={handleModalClose}>
      <ModalBody className="relative flex h-fit w-fit flex-col items-center gap-10 px-20 py-10 pb-[70px] text-[#9b9b9b]">
        <H1 className="flex w-full justify-center">Create Workout</H1>

        <form className="flex flex-col gap-4" action={handleCreateWorkout}>
          <div className="flex flex-col gap-1">
            <label htmlFor="workout-title">Title:</label>
            <Input disabled={isCreatingWorkout} name="name" id="workout-title" placeholder="Back Workout" />
          </div>

          <div className={"flex flex-col gap-1"}>
            <label htmlFor="workout-description">Description:</label>
            <textarea
              disabled={isCreatingWorkout}
              name="description"
              className={`${isCreatingWorkout && "opacity-50"} main-border-color resize-none rounded-lg border bg-[#202020] p-2 text-white outline-none`}
              id="workout-description"
              placeholder="This Workout is amazing"
            />
          </div>

          <div className={"flex flex-col gap-1"}>
            <label htmlFor="estimated-time">Estimated Time:</label>
            <div className="flex items-center gap-2">
              <Input
                className="hide-number-input-spinner"
                type="number"
                disabled={isCreatingWorkout}
                name="estimatedTime"
                id="estimated-time"
                placeholder="45"
              />
              <p>Minutes</p>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="difficulty-select">Difficulty: </label>
            <Select
              disabled={isCreatingWorkout}
              id="difficulty-select"
              name="difficulty"
              value="Select Difficulty"
              options={["Easy", "Medium", "Hard", "Expert"]}
            />
          </div>

          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button disabled={isCreatingWorkout} variant="secondary" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isCreatingWorkout} className="flex items-center gap-2">
              {isCreatingWorkout && <LoadingSpinner />}
              <p>Create Workout</p>
            </Button>
          </div>
        </form>
      </ModalBody>
    </ModalBackDrop>
  );
}
