import React from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="main-bg font-geistSans fixed inset-0 flex h-screen w-screen items-center justify-center text-white">
      <form className="flex w-[350px] flex-col gap-4">
        <h1 className="flex w-full justify-center text-2xl font-bold">Login</h1>
        <Input placeholder="Email" name="email" />
        <Input placeholder="Password" type="password" name="password" />
        <Button>Login</Button>
        <hr className="main-border-color" />
        <Button className="flex items-center justify-center gap-2">
          <Image src="/googleLogo.svg" width={21} height={21} alt="googleLogo" />
          <p>Continue With Google</p>
        </Button>
      </form>
    </div>
  );
}
