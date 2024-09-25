import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export function Button({ onClick, children, className, type = "button" }: Props) {
  return (
    <button onClick={onClick} className={twMerge("rounded-sm bg-white px-2 py-1 text-black", className)} type={type}>
      {children}
    </button>
  );
}
