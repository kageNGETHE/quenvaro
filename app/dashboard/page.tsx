import Link from "next/link";
import { ArrowLeft, ArrowRight, Bell, BrainCircuit, CalendarCheck2, CreditCard, TrendingUp } from "lucide-react";

const cards = [
  { icon: CreditCard, label: "Spending overview", value: "$3,480", detail: "Across 12 categories" },
  { icon: TrendingUp, label: "Net cash flow", value: "$1,240", detail: "Up 18% this month" },
  { icon: CalendarCheck2, label: "Tax readiness", value: "78%", detail: "3 actions remaining" },
];

const messages = [
  { role: "assistant", text: "You spent 28% more on food this month. Want me to suggest a tighter grocery budget?" },
  { role: "user", text: "Yes, and also tell me if my tax deductions look healthy." },
  { role: "assistant", text: "Your deduction trend is strong. Keep records for business mileage and home office costs." },
];

export default function DashboardPage() {
  return (
    <main className="bg-[#eef3f6] p-6 text-[#1b1f2a] md:p-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl font-black">Quenvaro</div>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-full border border-[#d5dfe8] bg-white px-4 py-2 text-sm font-semibold">
              View profile
            </button>
            <Link href="/" className="rounded-full bg-[#1b2940] px-4 py-2 text-sm font-semibold text-white">
              Home
            </Link>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <section className="space-y-6">
            <div className="rounded-[28px] bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-[#6b6b6b]">Overview</div>
                  <h1 className="mt-2 text-3xl font-black">Your financial snapshot</h1>
                </div>
                <div className="rounded-full bg-[#eaf5ff] px-3 py-2 text-sm font-semibold text-[#1d4e77]">
                  Updated today
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {cards.map(({ icon: Icon, label, value, detail }) => (
                  <div key={label} className="rounded-2xl bg-[#f7fafc] p-4">
                    <div className="mb-3 inline-flex rounded-xl bg-[#edf5fb] p-2.5 text-[#1d4e77]">
                      <Icon size={18} />
                    </div>
                    <div className="text-sm text-[#5b646d]">{label}</div>
                    <div className="mt-2 text-2xl font-black">{value}</div>
                    <div className="mt-1 text-xs text-[#66727d]">{detail}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] bg-[#0c213a] p-6 text-white shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#b8d2e8]">AI assistant</p>
                  <h2 className="mt-2 text-2xl font-bold">Private finance chat</h2>
                </div>
                <div className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-[#dfeeff]">
                  Secure session
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.text} className={msg.role === "assistant" ? "max-w-[90%] rounded-2xl bg-white/10 p-4 text-sm text-[#ebf5ff]" : "ml-auto max-w-[80%] rounded-2xl bg-[#eaf5ff] p-4 text-sm text-[#1d2e42]"}>
                    {msg.text}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white/5 p-3">
                <input
                  aria-label="Prompt"
                  value="Ask about spending, taxes, or cash flow"
                  readOnly
                  className="w-full bg-transparent text-sm text-[#dfeeff] placeholder:text-[#b3c9df] outline-none"
                />
                <button className="rounded-full bg-[#9dcff7] px-4 py-2 text-sm font-semibold text-[#0d213a]">
                  Send
                </button>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[28px] bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Quick actions</h3>
                <Bell className="text-[#4a6477]" size={18} />
              </div>

              <div className="mt-5 space-y-3">
                {[
                  "Review monthly subscriptions",
                  "Check tax deduction trends",
                  "Set a spending cap",
                ].map((action) => (
                  <button key={action} className="flex w-full items-center justify-between rounded-2xl bg-[#f3f8fb] px-4 py-3 text-left text-sm font-medium text-[#233447]">
                    <span>{action}</span>
                    <ArrowRight size={16} />
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-[#dfeaf3] bg-[#f5f9fb] p-6">
              <div className="flex items-center gap-2 text-[#234b67]">
                <BrainCircuit size={18} />
                <div className="font-bold">AI insight</div>
              </div>
              <p className="mt-4 text-[#404d5d]">
                Your spending is steady, but dining out is 26% above your ideal range. A weekly reset could save approximately $180 this month.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
