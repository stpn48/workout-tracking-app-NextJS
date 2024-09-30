import React from "react";

type Props = {
  inputComponent: React.ReactNode;
  labelText: string;
};

export function InputLabel({ inputComponent, labelText }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="set-name" className="text-secondary">
        {labelText}
      </label>
      {inputComponent}
    </div>
  );
}
