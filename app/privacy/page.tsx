import Link from "next/link";
import { ArrowLeft, CheckCircle2, Lock, RefreshCcw, ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="bg-[#f5f3ee] px-6 py-12 text-[#1b1f2a]">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#1b2940]">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <div className="rounded-[28px] border border-[#e2d9cf] bg-white p-8 shadow-soft md:p-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#6b6b6b]">Privacy</p>
          <h1 className="mt-4 text-4xl font-black md:text-5xl">Your data stays private.</h1>
          <p className="mt-5 text-lg text-[#4a4a4a]">
            Quenvaro is built for personal financial clarity without compromising privacy. We do not treat your finances as a product. Your personal information remains yours.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { icon: Lock, title: "Private chat only", text: "Data remains in the user’s private chat and account. It is not shared across users." },
              { icon: ShieldCheck, title: "Three firewalls", text: "Access control, encrypted transport, and strict data isolation reduce exposure to the minimum." },
              { icon: RefreshCcw, title: "30-day delete flow", text: "When a user deletes their profile, their data is scheduled for secure deletion and fully purged after 30 days." },
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

          <div className="mt-10 space-y-6">
            <div>
              <h2 className="text-2xl font-bold">What we do not do</h2>
              <ul className="mt-3 space-y-2 text-[#4b4b4b]">
                <li>• We do not expose user data to employees or administrators without explicit authorization.</li>
                <li>• We do not sell or share financial records with third parties.</li>
                <li>• We do not keep user data active after deletion beyond the retention window.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold">Retention policy</h2>
              <p className="mt-3 text-[#4b4b4b]">
                If someone deletes their account, Quenvaro begins a secure deletion process. The data is removed from active systems and purged in a controlled way. After 30 days, the account data is fully erased from operational storage and only retained in audit records required for compliance.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold">Security principles</h2>
              <div className="mt-3 space-y-2 text-[#4b4b4b]">
                {[
                  "Encryption in transit and at rest.",
                  "Role-based access controls.",
                  "Minimal data retention.",
                  "User-controlled deletion and privacy settings.",
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
