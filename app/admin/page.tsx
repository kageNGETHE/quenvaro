"use client";

import { useState } from "react";

type PendingUser = {
  id: string;
  email: string;
  deletedAt: string | null;
};

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState<PendingUser[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [purgeResult, setPurgeResult] = useState<number | null>(null);

  const fetchPending = async () => {
    setMessage(null);
    setPurgeResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/pending", {
        method: "GET",
        headers: {
          "x-admin-token": token,
          "content-type": "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch pending users");
      }

      setPending(data.users || []);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handlePurge = async () => {
    if (!confirm("This will permanently remove users that passed the retention window. Continue?")) return;
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/purge", {
        method: "POST",
        headers: {
          "x-admin-token": token,
          "content-type": "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Purge failed");
      }

      setPurgeResult(data.deleted ?? 0);
      // refresh list after purge
      await fetchPending();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f3ee] p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-black">Admin — Purge operations</h1>
        <p className="mt-2 text-sm text-[#555]">Use the admin token to view scheduled deletions and run the purge job.</p>

        <div className="mt-6 flex gap-3">
          <input
            placeholder="ADMIN_TOKEN"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="flex-1 rounded-2xl border border-[#dfe7f0] bg-white px-4 py-3 outline-none"
          />
          <button
            onClick={fetchPending}
            disabled={!token || loading}
            className="rounded-full bg-[#1b2940] px-4 py-2 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Loading..." : "Refresh list"}
          </button>
          <button
            onClick={handlePurge}
            disabled={!token || loading}
            className="rounded-full bg-[#b91c1c] px-4 py-2 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Working..." : "Purge now"}
          </button>
        </div>

        {message ? <div className="mt-4 rounded-md bg-[#fff1f0] p-3 text-sm text-[#8b1c1c]">{message}</div> : null}
        {purgeResult !== null ? (
          <div className="mt-4 rounded-md bg-[#eef7ee] p-3 text-sm text-[#165c26]">Purged {purgeResult} record(s)</div>
        ) : null}

        <div className="mt-8 rounded-[18px] border border-[#e6e6e6] bg-white p-4">
          <h2 className="text-lg font-semibold">Pending deletions</h2>
          <p className="mt-1 text-sm text-[#666]">Accounts that scheduled deletion (not yet purged).</p>

          <div className="mt-4">
            {pending.length === 0 ? (
              <div className="text-sm text-[#666]">No pending deletions.</div>
            ) : (
              <table className="w-full table-auto text-sm">
                <thead>
                  <tr className="text-left text-[#555]">
                    <th className="pb-2">Email</th>
                    <th className="pb-2">Scheduled deletion</th>
                    <th className="pb-2">Days until purge</th>
                  </tr>
                </thead>
                <tbody>
                  {pending.map((u) => {
                    const deletedAt = u.deletedAt ? new Date(u.deletedAt) : null;
                    const daysSince = deletedAt ? Math.floor((Date.now() - deletedAt.getTime()) / (1000 * 60 * 60 * 24)) : 0;
                    const daysLeft = Math.max(0, 30 - daysSince);
                    return (
                      <tr key={u.id} className="border-t">
                        <td className="py-3 text-[#222]">{u.email}</td>
                        <td className="py-3 text-[#444]">{deletedAt ? deletedAt.toLocaleString() : "-"}</td>
                        <td className="py-3 text-[#444]">{daysLeft}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="mt-8 text-xs text-[#666]">
          Tip: store ADMIN_TOKEN securely as an environment variable on your server. Do not share it publicly.
        </div>
      </div>
    </main>
  );
}
