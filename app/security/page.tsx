import Link from "next/link";
import { ArrowLeft, CheckCircle2, Lock, ShieldCheck, Sparkles } from "lucide-react";

export default function SecurityPage() {
  return (
    <main className="bg-[#f5f3ee] px-6 py-12 text-[#1b1f2a]">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#1b2940]">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <div className="rounded-[28px] border border-[#e2d9cf] bg-white p-8 shadow-soft md:p-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#6b6b6b]">Security</p>
          <h1 className="mt-4 text-4xl font-black md:text-5xl">Built to protect your personal financial life.</h1>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { icon: Lock, title: "Encryption", text: "All financial data is protected using secure encryption for storage and network traffic." },
              { icon: ShieldCheck, title: "Isolation", text: "Users are separated by strict access controls and isolated account boundaries." },
              { icon: Sparkles, title: "Auditability", text: "Access and deletion events are monitored to keep the system transparent and accountable." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl bg-[#f8f5f2] p-5">
                <div className="inline-flex rounded-xl bg-[#edf5fb] p-3 text-[#234b67]">
                  <Icon size={18} />
                </div>
                <h2 className="mt-4 text-lg font-bold">{title}</h2>
                <p className="mt-2 text-[#535353]">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-8">
            <div>
              <h2 className="text-2xl font-bold">Three firewalls</h2>
              <div className="mt-4 space-y-4">
                {[
                  { title: "Firewall 1", text: "Access controls ensure only the account owner can reach their data." },
                  { title: "Firewall 2", text: "All data is encrypted while moving and while stored in protected systems." },
                  { title: "Firewall 3", text: "Deletion logic removes records from live systems and purges them after a 30-day retention window." },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-[#ebdfd3] bg-[#fbfaf8] p-5">
                    <div className="text-sm uppercase tracking-[0.15em] text-[#6b6b6b]">{item.title}</div>
                    <p className="mt-2 text-[#4a4a4a]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold">Delete account workflow</h2>
              <div className="mt-4 space-y-2 text-[#4b4b4b]">
                {[
                  "User confirms account deletion.",
                  "Platform flags relevant data for secure erasure.",
                  "The account is no longer active for the user.",
                  "Data is purged from active systems and fully removed within 30 days.",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="text-[#1d4e77]" size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
