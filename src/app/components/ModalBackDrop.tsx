"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

export function ModalBackDrop({ onClick, children, className }: Props) {
  return (
    <div
      className={twMerge(
        "fixed inset-0 flex h-screen w-screen items-center justify-center bg-stone-900 bg-opacity-50",
        className,
      )}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {children}
    </div>
  );
}
