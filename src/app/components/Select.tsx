"use client";

import React, { useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  options: string[];
  value: string;
  id?: string;
  name?: string;
  disabled?: boolean;
};

export function Select({ className, options, value: initialValue, id, name, disabled }: Props) {
  const [value, setValue] = useState(initialValue);

  const handleOnChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  }, []);

  return (
    <select
      id={id}
      value={value}
      name={name}
      onChange={handleOnChange}
      disabled={disabled}
      className={twMerge(
        "main-border-color rounded-md border bg-[#202020] p-1 text-sm text-white outline-none",
        className,
        disabled && "opacity-50",
      )}
    >
      {options.map((option) => (
        <option key={option} value={option} className="main-border-color flex justify-center border-b border-t bg-black">
          {option}
        </option>
      ))}
    </select>
  );
}
