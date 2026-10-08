"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f3ee] p-6">
      <div className="w-full max-w-md rounded-[28px] border border-[#e2d9cf] bg-white p-8 shadow-soft">
        <div className="text-center">
          <div className="text-4xl font-black">Quenvaro</div>
          <p className="mt-2 text-sm text-[#5d5d5d]">Welcome back</p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#394457]">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-[#dfe7f0] bg-[#f8fafb] px-4 py-3 outline-none ring-0 transition focus:border-[#7aa4c4]"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#394457]">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-[#dfe7f0] bg-[#f8fafb] px-4 py-3 outline-none transition focus:border-[#7aa4c4]"
              required
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-[#1b2940] px-5 py-3 font-semibold text-white disabled:opacity-60"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#5d5d5d]">
          Don’t have an account? {" "}
          <Link href="/register" className="font-semibold text-[#1b2940]">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
