"use client";

import React, { useCallback, useTransition } from "react";
import { Button } from "../components/Button";
import Image from "next/image";
import toast from "react-hot-toast";
import { signInWithProvider } from "../actions/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLoggingIn, startLoggingIn] = useTransition();

  const router = useRouter();

  const handleGoogleLogin = useCallback(() => {
    startLoggingIn(async () => {
      const { error, url } = await signInWithProvider("google");

      if (error) {
        toast.error(error);
        return;
      }

      if (url) {
        router.replace(url);
      }
    });
  }, [router]);

  return (
    <div className="main-bg fixed inset-0 flex h-screen w-screen items-center justify-center font-geistSans text-white">
      <Button
        disabled={isLoggingIn}
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-2"
      >
        <Image src="/googleLogo.svg" width={21} height={21} alt="googleLogo" />
        <p>Continue With Google</p>
      </Button>
    </div>
  );
}
