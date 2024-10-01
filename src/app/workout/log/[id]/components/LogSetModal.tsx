"use client";

import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { ModalBody } from "@/app/components/ModalBody";
import { Set } from "@prisma/client";
import React, { SetStateAction, useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  sets: Set[];
  setLoggedExercises: React.Dispatch<React.SetStateAction<never[]>>;
  setCurrLoggingExerciseIndex: React.Dispatch<SetStateAction<number>>;
}; //TODO: fix type

export function LogSetModal({ sets, setCurrLoggingExerciseIndex, setLoggedExercises }: Props) {
  const [currLoggingSetIndex, setCurrLoggingSetIndex] = useState(0);
  const [userReps, setUserReps] = useState<number[]>([]); // user reps for this exercise
  const [userEffortInputValue, setUserEffortInputValue] = useState("");

  const handleNextClick = useCallback(
    (formData: FormData) => {
      const userEffort = Number(formData.get("userReps"));

      if (!userEffort) {
        toast.error("Please enter your effort");
        return;
      }

      setUserReps((prev) => {
        const updatedReps = [...prev];
        updatedReps[currLoggingSetIndex] = userEffort;
        return updatedReps;
      });

      // is at end a clicked next
      if (currLoggingSetIndex === sets.length - 1) {
        setCurrLoggingExerciseIndex((prev) => prev + 1);

        setLoggedExercises((prev) => {
          const updatedLoggedExercises = [...prev];
          updatedLoggedExercises.push({ userReps });
          return updatedLoggedExercises;
        });

        setUserReps([]);
        setCurrLoggingSetIndex(0);
        return;
      }

      setCurrLoggingSetIndex((prev) => prev + 1);

      if (userReps[currLoggingSetIndex + 1]) {
        setUserEffortInputValue(userReps[currLoggingSetIndex + 1].toString());
      } else {
        setUserEffortInputValue("");
      }
    },
    [currLoggingSetIndex],
  );

  const handlePreviousClick = useCallback(() => {
    setUserEffortInputValue(userReps[currLoggingSetIndex - 1].toString());
    setCurrLoggingSetIndex((prev) => prev - 1);
  }, [currLoggingSetIndex]);

  return (
    <ModalBody className="flex h-fit w-fit flex-col gap-4 p-8">
      <div className="flex flex-col gap-1">
        <p className="text-secondary text-xs font-bold uppercase">set {currLoggingSetIndex + 1}</p>
        <h1 className="text-base font-bold">{sets[currLoggingSetIndex].name}</h1>
      </div>
      <p>Goal reps: {sets[currLoggingSetIndex].reps}</p>

      <form className="flex flex-col gap-4" action={handleNextClick}>
        <div className="flex flex-col gap-1">
          <label className="text-secondary text-xs" htmlFor="user-reps">
            Your Effort:
          </label>
          <Input
            value={userEffortInputValue}
            onChange={(e) => setUserEffortInputValue(e.target.value)}
            type="number"
            placeholder="8"
            name="userReps"
          />
        </div>
        <div className="flex justify-center gap-2">
          <Button variant="secondary" onClick={handlePreviousClick}>
            Previous
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </ModalBody>
  );
}
