import Link from "next/link";

const features = [
  {
    icon: "🔗",
    title: "Connect Any Form",
    description:
      "Google Forms, Typeform, or your website embed — one webhook URL routes every submission instantly.",
  },
  {
    icon: "💬",
    title: "WhatsApp Auto-Send",
    description:
      "Template-based messages via WhatsApp Business API. Hindi & English templates, delivered in seconds.",
  },
  {
    icon: "📊",
    title: "Google Sheets Sync",
    description:
      "Visual field mapping UI. Every lead auto-appends to your spreadsheet — no copy-paste ever again.",
  },
  {
    icon: "⏰",
    title: "Follow-Up Sequences",
    description:
      "Day 1, Day 3, Day 7 automated WhatsApp follow-ups. Never lose a lead to slow response times.",
  },
  {
    icon: "📈",
    title: "Live Dashboard",
    description:
      "Submission volume, delivery rates, and error alerts — everything your morning routine used to take 2 hours.",
  },
  {
    icon: "🇮🇳",
    title: "Built for India",
    description:
      "INR pricing, Hindi UI, WhatsApp-first design. No USD surprises, no Zapier complexity.",
  },
];

const pricing = [
  {
    name: "Starter",
    price: "₹999",
    period: "/month",
    submissions: "500 submissions",
    features: [
      "3 connected forms",
      "WhatsApp templates (Hindi + English)",
      "Google Sheets sync",
      "Day 1/3/7 follow-ups",
      "Email support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "₹2,499",
    period: "/month",
    submissions: "2,000 submissions",
    features: [
      "Unlimited forms",
      "Priority WhatsApp delivery",
      "Multi-sheet routing",
      "Custom follow-up sequences",
      "Hindi support + reseller access",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/30 via-surface-900 to-surface-900" />
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-brand-600/10 blur-3xl" />
        <div className="absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-emerald-600/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-900/30 px-4 py-1.5 text-sm text-brand-300">
              <span className="h-2 w-2 rounded-full bg-brand-400 animate-pulse" />
              Built for Indian SMBs · WhatsApp-first
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Stop copying form leads into{" "}
              <span className="gradient-text">WhatsApp &amp; Sheets</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-400">
              FormRelay routes every Google Form, Typeform, and website submission
              to WhatsApp and Google Sheets automatically — with follow-up sequences
              that run while you focus on your business.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/demo"
                className="w-full rounded-xl bg-brand-600 px-8 py-3.5 text-center font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-500 sm:w-auto"
              >
                Explore Live Demo →
              </Link>
              <Link
                href="/research"
                className="w-full rounded-xl border border-white/20 px-8 py-3.5 text-center font-medium text-gray-300 transition hover:border-white/40 hover:text-white sm:w-auto"
              >
                How we found this idea
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Trusted by coaching centres, clinics, and retailers across India
            </p>
          </div>

          {/* Stats bar */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: "2 hrs", label: "saved daily per owner" },
              { value: "487", label: "submissions this month" },
              { value: "98.2%", label: "WhatsApp delivery rate" },
              { value: "₹999", label: "starting price / month" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-4 text-center">
                <p className="text-2xl font-bold text-brand-400">{stat.value}</p>
                <p className="mt-1 text-xs text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-white/10 bg-surface-800/50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to{" "}
              <span className="gradient-text">automate lead routing</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              From webhook to WhatsApp to spreadsheet — one platform, zero manual
              work. Designed for owners who don&apos;t have time for Zapier.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="glass-card group p-6 transition hover:border-brand-500/30 hover:bg-surface-700/50"
              >
                <div className="mb-4 text-3xl">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            How FormRelay works
          </h2>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Connect your form",
                desc: "Paste one webhook URL into Google Forms, Typeform, or your website. Done in 2 minutes.",
              },
              {
                step: "02",
                title: "Map your fields",
                desc: "Drag-and-drop field mapping to WhatsApp templates and Google Sheets columns.",
              },
              {
                step: "03",
                title: "Leads flow automatically",
                desc: "Every submission triggers WhatsApp + Sheets instantly. Follow-ups run on Day 1, 3, and 7.",
              },
            ].map((item) => (
              <div key={item.step} className="relative glass-card p-6">
                <span className="text-4xl font-bold text-brand-600/30">{item.step}</span>
                <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-white/10 bg-surface-800/50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Simple INR pricing
            </h2>
            <p className="mt-4 text-gray-400">
              No USD conversion surprises. Pay in rupees, cancel anytime.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className={`glass-card relative p-8 ${
                  plan.highlighted
                    ? "border-brand-500/50 ring-1 ring-brand-500/30"
                    : ""
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-0.5 text-xs font-medium text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-brand-400">{plan.submissions}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="mt-0.5 text-brand-400">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/demo"
                  className={`mt-8 block w-full rounded-lg py-3 text-center text-sm font-semibold transition ${
                    plan.highlighted
                      ? "bg-brand-600 text-white hover:bg-brand-500"
                      : "border border-white/20 text-gray-300 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to reclaim your mornings?
          </h2>
          <p className="mt-4 text-gray-400">
            See the full interactive demo — every feature, every button, real mock data.
          </p>
          <Link
            href="/demo"
            className="mt-8 inline-block rounded-xl bg-brand-600 px-10 py-4 font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-500"
          >
            Open Live Demo →
          </Link>
        </div>
      </section>
    </>
  );
}
