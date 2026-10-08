import Link from "next/link";
import { ArrowRight, BarChart3, BrainCircuit, CheckCircle2, Clock3, ShieldCheck, Sparkles, Wallet } from "lucide-react";

const palette = [
  { name: "Blue", color: "#7AA4C4" },
  { name: "Plum", color: "#4E3A4D" },
  { name: "Gold", color: "#C8A66B" },
  { name: "Stone", color: "#D9D1C4" },
  { name: "Slate", color: "#7E93A4" },
];

const metrics = [
  { label: "Spent tracked", value: "4.2k+" },
  { label: "Taxes reviewed", value: "87%" },
  { label: "Saved this month", value: "$1,240" },
];

const features = [
  {
    icon: BrainCircuit,
    title: "AI financial coach",
    text: "Ask anything about expenses, bills, taxes, savings, and cash flow in plain English.",
  },
  {
    icon: Wallet,
    title: "Smart budgeting",
    text: "Track spending in real time and catch waste before it becomes stress.",
  },
  {
    icon: BarChart3,
    title: "Tax clarity",
    text: "Stay on top of deductions, deadlines, and smarter tax planning throughout the year.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    text: "Your data remains in your account and your private chat — no cross-user visibility.",
  },
];

const steps = [
  "Connect securely",
  "Let the AI learn your spending",
  "Get fast advice",
  "Delete anytime with secure purge",
];

export default function HomePage() {
  return (
    <main className="bg-[#f5f3ee] text-[#1a1a1a]"> 
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(122,164,196,0.2),_transparent_55%)]" />
        <div className="mx-auto max-w-7xl px-6 py-8 md:py-10">
          <header className="flex items-center justify-between">
            <div className="text-4xl font-black tracking-tight">Quenvaro</div>
            <nav className="hidden items-center gap-8 text-sm font-medium text-[#333] md:flex">
              <Link href="#features">Features</Link>
              <Link href="#security">Security</Link>
              <Link href="#pricing">Pricing</Link>
              <Link href="/privacy">Privacy</Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="rounded-full border border-[#1b2940] px-4 py-2 text-sm font-semibold text-[#1b2940]">
                Sign in
              </Link>
              <button className="rounded-full bg-[#1b2940] px-5 py-2.5 text-sm font-semibold text-white">
                Get started
              </button>
            </div>
          </header>

          <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="inline-flex items-center rounded-full border border-[#d7d0c5] bg-white/60 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#4a4a4a]">
                AI finance for the new generation
              </p>
              <h1 className="mt-6 text-5xl font-black leading-none tracking-tight md:text-7xl">
                Keep your money clear.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-[#4b4b4b]">
                Track your spending, understand your taxes, plan smarter, and get real-time financial advice — all in one private AI chat.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/dashboard" className="rounded-full bg-[#1b2940] px-6 py-3 font-semibold text-white">
                  Start free
                </Link>
                <Link href="#features" className="rounded-full border border-[#1b2940] px-6 py-3 font-semibold text-[#1b2940]">
                  Watch demo
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-6">
                {metrics.map((item) => (
                  <div key={item.label}>
                    <div className="text-2xl font-black">{item.value}</div>
                    <div className="text-sm text-[#5d5d5d]">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-10 h-24 w-24 rounded-full bg-[#b9d6ea] blur-3xl opacity-80" />
              <div className="absolute bottom-10 right-8 h-28 w-28 rounded-full bg-[#d3c3a6] blur-3xl opacity-80" />

              <div className="rounded-[32px] border border-[#d5d5d5] bg-white p-3 shadow-soft">
                <div className="rounded-[28px] overflow-hidden bg-[#edf3f7]">
                  <div className="flex h-16 items-center border-b border-[#dfeaf3] bg-[#f5f8fa] px-5">
                    <div className="flex gap-2">
                      <span className="h-3 w-3 rounded-full bg-[#d9d9d9]" />
                      <span className="h-3 w-3 rounded-full bg-[#d9d9d9]" />
                      <span className="h-3 w-3 rounded-full bg-[#d9d9d9]" />
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <div className="text-xs uppercase tracking-[0.12em] text-[#6b6b6b]">Portfolio</div>
                        <div className="text-3xl font-bold">$8,420</div>
                      </div>
                      <div className="rounded-full bg-[#eaf5ff] px-3 py-2 text-sm font-semibold text-[#1d4e77]">
                        +12.4%
                      </div>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-[#0d2340] to-[#1d3d62] p-4">
                      <div className="flex items-center justify-between text-xs text-white/80">
                        <span>Cash flow</span>
                        <span>May</span>
                      </div>
                      <div className="relative mt-5 h-24">
                        <div className="absolute inset-0 flex items-end gap-2">
                          {[18, 24, 20, 32, 28, 40, 36, 52, 60, 58, 72, 80].map((height, i) => (
                            <div
                              key={i}
                              className="w-full rounded-t-md bg-gradient-to-t from-[#5cc3ff] to-[#a6e5ff]"
                              style={{ height: `${height}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex gap-4">
                      <div className="flex-1 rounded-2xl bg-[#f4efe9] p-4">
                        <div className="text-xs uppercase tracking-[0.12em] text-[#666]">Spend</div>
                        <div className="mt-2 text-2xl font-bold">$1,208</div>
                      </div>
                      <div className="flex-1 rounded-2xl bg-[#eef6ef] p-4">
                        <div className="text-xs uppercase tracking-[0.12em] text-[#666]">Saved</div>
                        <div className="mt-2 text-2xl font-bold">$825</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#6b6b6b]">Color palette</p>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {palette.map((item) => (
              <div key={item.name} className="flex flex-col items-center gap-3">
                <div className="h-24 w-24 rounded-full" style={{ background: item.color }} />
                <span className="text-sm text-[#525252]">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#6b6b6b]">Built for clarity</p>
          <h2 className="mt-4 text-4xl font-black">A smarter way to manage money.</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-[26px] border border-[#e9e2d8] bg-white p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf5fb] text-[#1a3852]">
                <Icon size={20} />
              </div>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-7 text-[#5d5d5d]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="security" className="bg-[#eff5f8] py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#6b6b6b]">Privacy-first infrastructure</p>
            <h2 className="mt-4 text-4xl font-black">Your data stays yours.</h2>
            <p className="mt-5 text-lg text-[#4d4d4d]">
              Quenvaro is designed with three layers of protection so financial information remains private and accessible only to the user who owns it.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "End-to-end encryption for user data in transit and at rest.",
                "Role-based access isolation so no one can view personal data outside the user’s account.",
                "Secure account deletion flow with full purge across systems within 30 days.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 text-[#234b67]" size={20} />
                  <p className="text-[#3d3d3d]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-[#dde7ef] bg-white p-8 shadow-soft">
            <div className="grid gap-5">
              <div className="rounded-2xl bg-[#edf5fd] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#234b67]">Firewall 01</span>
                  <ShieldCheck className="text-[#234b67]" size={18} />
                </div>
                <p className="mt-3 text-[#4a4a4a]">Account isolation and permission boundaries.</p>
              </div>

              <div className="rounded-2xl bg-[#f7f0e8] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#71562f]">Firewall 02</span>
                  <ShieldCheck className="text-[#71562f]" size={18} />
                </div>
                <p className="mt-3 text-[#4a4a4a]">Encrypted storage and secure communication channels.</p>
              </div>

              <div className="rounded-2xl bg-[#f3eef8] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#4d3558]">Firewall 03</span>
                  <ShieldCheck className="text-[#4d3558]" size={18} />
                </div>
                <p className="mt-3 text-[#4a4a4a]">Deletion workflow and forensic purge after 30 days.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#6b6b6b]">How it works</p>
          <h2 className="mt-4 text-4xl font-black">Straight to the point.</h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step} className="relative rounded-[26px] border border-[#e7e0d8] bg-white p-6">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-[#1d3b58]">{index + 1}</span>
                <Clock3 className="text-[#6e7b87]" size={18} />
              </div>
              <p className="mt-5 text-[#3f3f3f]">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="bg-[#1b1f2a] py-20 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-[#b9c6d8]">Pricing</p>
            <h2 className="mt-4 text-4xl font-black">Simple pricing. Zero clutter.</h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { name: "Starter", price: "$0", description: "For curious beginners." },
              { name: "Growth", price: "$19", description: "For active spend tracking and AI insights." },
              { name: "Premium", price: "$39", description: "For full planning, tax review, and wealth guidance." },
            ].map((card) => (
              <div key={card.name} className="rounded-[28px] border border-[#2d3748] bg-[#232a36] p-8">
                <p className="text-xl font-bold">{card.name}</p>
                <div className="mt-6 text-5xl font-black">
                  {card.price}
                  <span className="text-lg text-[#afbdce]">/mo</span>
                </div>
                <p className="mt-4 text-[#c4cfda]">{card.description}</p>
                <button className="mt-8 w-full rounded-full bg-white py-3 font-semibold text-[#121826]">
                  Get started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col items-center justify-between gap-8 rounded-[30px] border border-[#e3dccf] bg-[#f4efe8] p-10 md:flex-row">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#6b6b6b]">Ready to take control?</p>
            <h2 className="mt-3 text-4xl font-black">Build better money habits.</h2>
          </div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-[#1b2940] px-7 py-4 font-semibold text-white">
            Start free <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 pb-10 pt-4 text-sm text-[#5d5d5d]">
        <div className="flex flex-col justify-between border-t border-[#e4ddd3] pt-6 md:flex-row">
          <div className="text-2xl font-black text-[#1a1a1a]">Quenvaro</div>
          <div className="mt-3 flex gap-6 md:mt-0">
            <Link href="/privacy">Privacy</Link>
            <Link href="/security">Security</Link>
            <Link href="#">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
