"use client";

import Button from "@/components/ui/Button";
import Github from "@/components/ui/Github";
import Input from "@/components/ui/Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      if (res?.url) {
        router.replace("/");
      }
      console.log("invalid values");
    } else {
      console.log("successfully logged in values");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-5 w-[350px] mt-16 flex flex-col gap-3 items-center justify-center">
        <h1 className="text-3xl text-primary font-extrabold">Login</h1>
        <form onSubmit={loginUser} className="flex flex-col gap-2 w-full">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="email"
            name="email"
            className="bg-gray-50"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="password"
            className="bg-gray-50"
          />
          <Button type="submit" className="rounded-lg">
            Login
          </Button>
        </form>
        <p className="text-gray-600">or login with provider</p>
        <Button
          onClick={() => signIn("github")}
          className="w-full bg-transparent rounded-lg text-slate-800 border"
        >
          {/* <Image
            className="mr-2"
            src="/google.png"
            width={20}
            height={20}
            alt="google logo"
          /> */}
          <Github />
          <span className="ml-2">Login with github</span>
        </Button>
      </div>
    </div>
  );
}
