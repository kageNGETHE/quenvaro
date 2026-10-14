"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded-full border border-[#d5dfe8] bg-white px-4 py-2 text-sm font-semibold"
    >
      Sign out
    </button>
  );
}
