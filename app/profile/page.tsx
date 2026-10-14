"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your account? This will schedule permanent deletion in 30 days.")) return;
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/delete-account", { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete account");
      }

      setMessage("Account scheduled for deletion. You will be signed out.");
      // sign out the user and redirect home
      await signOut({ callbackUrl: "/" });
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Deletion failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f3ee] p-6">
      <div className="w-full max-w-xl rounded-[28px] border border-[#e2d9cf] bg-white p-8 shadow-soft">
        <h1 className="text-2xl font-black">Account Settings</h1>
        <p className="mt-3 text-sm text-[#5d5d5d]">Manage your profile and privacy settings. Deleting your account will schedule secure removal of your data after 30 days.</p>

        <div className="mt-8 space-y-4">
          <div className="rounded-2xl border border-[#f0e8e0] bg-[#fff7f7] p-4">
            <h2 className="font-semibold">Delete account</h2>
            <p className="mt-2 text-sm text-[#5d5d5d]">When you delete your account we start a secure deletion process. After 30 days all personal data is purged from active systems.</p>
            <button onClick={handleDelete} disabled={loading} className="mt-4 rounded-full bg-[#b91c1c] px-4 py-2 font-semibold text-white disabled:opacity-60">
              {loading ? "Deleting..." : "Delete my account"}
            </button>
          </div>

          {message ? <div className="rounded-md bg-[#f3f4f6] p-3 text-sm">{message}</div> : null}
        </div>
      </div>
    </main>
  );
}
