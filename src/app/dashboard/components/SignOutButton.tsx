"use client";

import { signOut } from "@/app/actions/auth";
import { Button } from "@/app/components/Button";
import { ConfirmationModal } from "@/app/components/ConfirmationModal";
import React, { useCallback, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export function SignOutButton({ className }: Props) {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [signingOut, startSigningOut] = useTransition();

  const handleSignOut = useCallback(() => {
    startSigningOut(async () => {
      await signOut();
      toast.success("Signed out successfully");
    });
  }, []);

  return (
    <>
      <Button
        className={twMerge("", className)}
        disabled={signingOut}
        onClick={() => setShowConfirmationModal(true)}
      >
        Sign Out
      </Button>

      {showConfirmationModal && (
        <ConfirmationModal
          message="Are you sure you want to sign out?"
          onConfirm={handleSignOut}
          onCancel={() => setShowConfirmationModal(false)}
        />
      )}
    </>
  );
}
