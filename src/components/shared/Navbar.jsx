"use client";
import Link from "next/link";
import React from "react";
import Button from "../ui/Button";
import ShoppingCart from "../ui/ShoppingCart";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const session = useSession();
  console.log(session);

  return (
    <div className="sm:px-24 px-10 py-5 flex justify-between items-center">
      <div className="flex items-center gap-8">
        <Link href="/">
          <h1 className="text-primary font-extrabold text-2xl">ST PIZZA</h1>
        </Link>
        <ul className="text-gray-500 font-bold gap-6 lg:flex hidden">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/menu">Menu</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      {session.status === "authenticated" ? (
        <div className="flex items-center gap-5">
          <Image
            src={session.data.user.image}
            width={40}
            height={40}
            className="rounded-full"
            alt="user image"
          />
          <Button className="px-8 py-2" onClick={() => signOut()}>
            Logout
          </Button>
          <div className="relative">
            <ShoppingCart />
            <span className="w-5 h-5 text-white text-xs flex items-center justify-center bg-primary rounded-full absolute -right-3 -top-2">
              10
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button className="bg-transparent text-slate-800">Login</Button>
          </Link>
          <Link href="/register">
            <Button className="px-6 py-2">Register</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
