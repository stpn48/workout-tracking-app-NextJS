"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function ModalBody({ children, className, onClick }: Props) {
  return (
    <div
      className={twMerge("secondary-bg main-border-color h-[95%] w-[80%] rounded-lg border p-4 shadow-md", className)}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}
