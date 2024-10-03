"use client";

import React, { useCallback, useTransition } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import Image from "next/image";
import toast from "react-hot-toast";
import { createUser, signInWithProvider } from "../actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [isCreatingAccount, startCreatingAccount] = useTransition();

  const router = useRouter();

  const handleCreateAccount = useCallback(
    (formData: FormData) => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const repeatedPassword = formData.get("repeatedPassword") as string;

      if (!email || !password || !repeatedPassword) {
        toast.error("Please fill all fields");
        return;
      }

      if (password !== repeatedPassword) {
        toast.error("Passwords do not match");
        return;
      }

      if (!email.includes("@") || !email.includes(".")) {
        toast.error("Invalid email");
        return;
      }

      startCreatingAccount(async () => {
        const { error } = await createUser(email, password);

        if (error) {
          toast.error(error);
          return;
        }
      });

      toast.success("Account created successfully");
      router.replace("/dashboard");
    },
    [router],
  );

  const handleGoogleLogin = useCallback(() => {
    startCreatingAccount(async () => {
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
      <form action={handleCreateAccount} className="flex w-[350px] flex-col gap-4">
        <h1 className="flex w-full justify-center text-3xl font-bold">Sign Up</h1>
        <Input disabled={isCreatingAccount} placeholder="Email" name="email" />
        <Input
          disabled={isCreatingAccount}
          placeholder="Password"
          type="password"
          name="password"
        />
        <Input
          disabled={isCreatingAccount}
          placeholder="Repeat Password"
          type="password"
          name="repeatedPassword"
        />
        <Button disabled={isCreatingAccount} type="submit">
          Signup
        </Button>
        <p>
          Have an account? Login{" "}
          <Link href={"/login"} className="underline">
            here
          </Link>
        </p>
        <hr className="main-border-color" />
        <Button
          disabled={isCreatingAccount}
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2"
        >
          <Image src="/googleLogo.svg" width={21} height={21} alt="googleLogo" />
          <p>Continue With Google</p>
        </Button>
      </form>
    </div>
  );
}
