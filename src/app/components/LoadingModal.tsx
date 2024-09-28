import React from "react";
import { ModalBody } from "./ModalBody";
import { LoadingSpinner } from "./LoadingSpinner";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export function LoadingModal({ className }: Props) {
  return (
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-stone-900 bg-opacity-50">
      <ModalBody className={twMerge("relative flex items-center justify-center p-0", className)}>
        <LoadingSpinner />
      </ModalBody>
    </div>
  );
}
