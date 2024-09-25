"use client";

import { signOut } from "@/app/actions/auth";
import { Button } from "@/app/components/Button";
import { useRouter } from "next/navigation";
import React, { useCallback, useTransition } from "react";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export function SignOutButton({ className }: Props) {
  const [signingOut, startSigningOut] = useTransition();

  const router = useRouter();

  const handleSignOut = useCallback(() => {
    startSigningOut(async () => {
      await signOut();
      router.replace("/login"); // TODO: Remove this after implementing the protected route. Wont be needed.
      toast.success("Signed out successfully");
    });
  }, []);

  return (
    <Button className={twMerge("", className)} disabled={signingOut} onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}
