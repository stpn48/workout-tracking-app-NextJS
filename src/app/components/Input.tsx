import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: "text" | "password" | "email" | "number";
  id?: string;
};

export function Input({ className, name, type = "text", onChange, placeholder, disabled, id }: Props) {
  return (
    <input
      id={id}
      type={type}
      className={twMerge(
        "main-border-color hide-number-input-spinner rounded-md border bg-[#202020] px-2 py-1 text-white outline-none focus:border-[#2e2e2e]",
        className,
        disabled && "opacity-50",
        disabled && "cursor-not-allowed",
      )}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
