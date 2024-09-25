"use client";

import { ModalBackDrop } from "@/app/components/ModalBackDrop";
import { ModalBody } from "@/app/components/ModalBody";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

export function CreateWorkoutModal() {
  const router = useRouter();

  const handleModalClose = useCallback(() => {
    router.replace("/dashboard");
  }, [router]);

  return (
    <ModalBackDrop onClick={handleModalClose}>
      <ModalBody>hi</ModalBody>
    </ModalBackDrop>
  );
}
