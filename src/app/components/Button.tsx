import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
};

export function Button({
  onClick,
  children,
  className,
  type = "button",
  disabled,
  variant = "primary",
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        variant === "primary" && "rounded-sm bg-white px-2 py-1 text-black hover:bg-opacity-90",
        variant === "secondary" &&
          "rounded-sm bg-[#363636] px-2 py-1 text-white hover:bg-opacity-90",
        variant === "danger" && "rounded-sm bg-red-500 px-2 py-1 text-white hover:bg-opacity-90",
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
