import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export function Button({ onClick, children, className, type = "button", disabled }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        "rounded-sm bg-white px-2 py-1 text-black hover:bg-opacity-90",
        className,
        disabled && "opacity-50",
        disabled && "cursor-not-allowed",
      )}
      type={type}
    >
      {children}
    </button>
  );
}
