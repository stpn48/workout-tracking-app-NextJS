import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export function ModalBackDrop({ children, className, onClick, disabled }: Props) {
  return (
    <div
      className={twMerge(
        "fixed inset-0 z-10 flex h-screen w-screen items-center justify-center bg-stone-900 bg-opacity-50",
        className,
      )}
      onClick={!disabled ? onClick : undefined}
    >
      {children}
    </div>
  );
}
