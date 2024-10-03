import React from "react";
import { Button } from "@/app/components/Button";
import { ModalBackDrop } from "@/app/components/ModalBackdrop";
import { ModalBody } from "@/app/components/ModalBody";

type Props = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmationModal({ message, onCancel, onConfirm }: Props) {
  return (
    <ModalBackDrop onClick={onCancel}>
      <ModalBody className="flex h-fit w-fit flex-col gap-4 p-4 text-sm">
        <p className="text-base">{message}</p>
        <div className="flex justify-center gap-2">
          <Button onClick={onCancel}>Cancel</Button>
          <Button variant="secondary" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </ModalBody>
    </ModalBackDrop>
  );
}
