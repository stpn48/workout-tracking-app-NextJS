"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  closeModal?: () => void;
};

export function ModalBody({ children, className, onClick, closeModal }: Props) {
  return (
    <div
      className={twMerge(
        "secondary-bg main-border-color relative h-[95%] w-[80%] rounded-lg border p-4 shadow-md",
        className,
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {closeModal && (
        <svg
          onClick={closeModal}
          className="absolute right-4 top-4 size-6 h-5 w-5 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      )}

      {children}
    </div>
  );
}
