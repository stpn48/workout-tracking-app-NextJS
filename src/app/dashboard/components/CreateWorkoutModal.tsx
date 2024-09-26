"use client";

import { Button } from "@/app/components/Button";
import { H1 } from "@/app/components/H1";
import { Input } from "@/app/components/Input";
import { ModalBackDrop } from "@/app/components/ModalBackDrop";
import { ModalBody } from "@/app/components/ModalBody";
import { Select } from "@/app/components/Select";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

export function CreateWorkoutModal() {
  const router = useRouter();

  const handleModalClose = useCallback(() => {
    router.replace("/dashboard");
  }, [router]);

  return (
    <ModalBackDrop onClick={handleModalClose}>
      <ModalBody className="relative flex w-[100%] flex-col items-center gap-10 text-[#9b9b9b] lg:w-[60%]">
        <H1 className="flex w-full justify-center">Create Workout</H1>
        <form className="flex flex-col gap-4" action="">
          <div className="flex flex-col gap-1">
            <label htmlFor="workout-title">Title:</label>
            <Input id="workout-title" placeholder="Back Workout" />
          </div>

          <div className={"flex flex-col gap-1"}>
            <label htmlFor="workout-description">Description:</label>
            <textarea
              className="main-border-color resize-none rounded-lg border bg-[#202020] p-2 text-white outline-none"
              id="workout-description"
              placeholder="This Workout is amazing"
            />
          </div>

          <div className={"flex flex-col gap-1"}>
            <label htmlFor="estimated-time">Estimated Time:</label>
            <div className="flex items-center gap-2">
              <Input id="estimated-time" placeholder="45" />
              <p>Minutes</p>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="difficulty-select">Difficulty: </label>
            <Select id="difficulty-select" value="Select Difficulty" options={["Easy", "Medium", "Hard", "Expert"]} />
          </div>

          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button variant="secondary">Cancel</Button>
            <Button>Start Creating</Button>
          </div>
        </form>
      </ModalBody>
    </ModalBackDrop>
  );
}
