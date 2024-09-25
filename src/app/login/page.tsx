"use client";

import React, { useCallback, useTransition } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { loginUser, signInWithProvider } from "../actions/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLoggingIn, startLoggingIn] = useTransition();

  const router = useRouter();

  const handleLogin = useCallback((formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Invalid email");
      return;
    }

    startLoggingIn(async () => {
      const { error } = await loginUser(email, password);

      if (error) {
        toast.error(error);
        return;
      }
    });

    toast.success("Logged in successfully");
    router.replace("/dashboard");
  }, []);

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
  }, []);

  return (
    <div className="main-bg fixed inset-0 flex h-screen w-screen items-center justify-center font-geistSans text-white">
      <form action={handleLogin} className="flex w-[350px] flex-col gap-4">
        <h1 className="flex w-full justify-center text-3xl font-bold">Login</h1>
        <Input disabled={isLoggingIn} placeholder="Email" name="email" />
        <Input disabled={isLoggingIn} placeholder="Password" type="password" name="password" />
        <Button type="submit" disabled={isLoggingIn}>
          Login
        </Button>
        <p>
          Don't have an account? Signup{" "}
          <Link href={"/signup"} className="underline">
            here
          </Link>
        </p>
        <hr className="main-border-color" />
        <Button disabled={isLoggingIn} onClick={handleGoogleLogin} className="flex items-center justify-center gap-2">
          <Image src="/googleLogo.svg" width={21} height={21} alt="googleLogo" />
          <p>Continue With Google</p>
        </Button>
      </form>
    </div>
  );
}
