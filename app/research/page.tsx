import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research — How We Found FormRelay",
  description:
    "The origin story, validation results, and source pain points behind FormRelay — mined from real Reddit posts by Indian SMB owners.",
};

const checklist = [
  { label: "10+ posts with this pain", passed: true },
  { label: "Paying for inferior solution", passed: true },
  { label: "Reachable channel", passed: true },
  { label: "MVP < 4 weeks", passed: true },
  { label: "Price point high enough", passed: true },
  { label: "Hair-on-fire problem", passed: true },
  { label: "Can pre-sell", passed: true },
  { label: "< 3 competitors", passed: true },
  { label: "Low-maintenance ops (mailbox money)", passed: true },
];

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <p className="text-sm font-medium text-brand-400">Idea Miner Research</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          How we found FormRelay
        </h1>
        <p className="mt-4 text-gray-400">
          This page tells the research story behind the product — mined from real
          conversations where Indian SMB owners describe spending hours every morning
          copying form responses into WhatsApp and spreadsheets.
        </p>
      </div>

      {/* Origin story */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold">The origin story</h2>
        <div className="mt-4 glass-card p-6">
          <p className="leading-relaxed text-gray-300">
            A Reddit post in{" "}
            <a
              href="https://www.reddit.com/r/indianstartups/comments/1u775qs/i_save_small_businesses_20_hoursweek_with_simple/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 hover:underline"
            >
              r/indianstartups
            </a>{" "}
            describes a consultant who charges ₹5,000–₹30,000 one-time to build
            automations for small businesses — and the comments are flooded with
            business owners asking for help with exactly this:{" "}
            <em className="text-white">
              &ldquo;I spend 2 hours every morning copying form responses into
              WhatsApp and a sheet.&rdquo;
            </em>
          </p>
          <p className="mt-4 leading-relaxed text-gray-300">
            The consultant notes clients are paying one-time fees for what should be a
            recurring SaaS product. The pain is daily, the workaround is manual, and
            the existing tools (Zapier, Make) are priced in USD and require technical
            setup that Indian SMB owners can&apos;t navigate alone.
          </p>
        </div>
      </section>

      {/* Scoring */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold">Opportunity scoring</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-bold text-brand-400">107</p>
            <p className="mt-1 text-sm text-gray-400">Rubric score / 130</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-bold text-brand-400">9/9</p>
            <p className="mt-1 text-sm text-gray-400">Validation checks passed</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-bold text-brand-400">45 min</p>
            <p className="mt-1 text-sm text-gray-400">Owner time / week</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-400">
          <strong className="text-gray-300">Cluster:</strong> Manual data entry &amp;
          repetitive SMB operations (India)
        </p>
      </section>

      {/* Validation checklist */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold">Validation checklist</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {checklist.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-lg border border-white/10 bg-surface-800 px-4 py-3"
            >
              <span className="text-brand-400">✓</span>
              <span className="text-sm text-gray-300">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Competitive landscape */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold">Competitive landscape</h2>
        <div className="mt-4 glass-card p-6">
          <p className="leading-relaxed text-gray-300">
            Zapier/Make exist but are too technical and priced in USD. Pabbly Connect
            is a competitor but generic and not WhatsApp-first. No India-focused,
            WhatsApp-native form router with INR pricing and Hindi UI exists.
          </p>
          <div className="mt-4 rounded-lg bg-brand-900/20 p-4">
            <p className="text-sm font-medium text-brand-300">Unfair advantage</p>
            <p className="mt-1 text-sm text-gray-400">
              INR pricing, WhatsApp Business API as first-class citizen (not an
              afterthought), Hindi/regional language UI, and a reseller program
              targeting the thousands of Indian freelancers already selling automation
              services to SMBs.
            </p>
          </div>
        </div>
      </section>

      {/* Go-to-market */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold">Go-to-market</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {[
            "WhatsApp groups for Indian SMB communities",
            "r/indianstartups",
            "YouTube Shorts demos in Hindi",
            "Partnerships with digital marketing freelancers",
          ].map((channel) => (
            <span
              key={channel}
              className="rounded-full border border-white/10 bg-surface-800 px-4 py-2 text-sm text-gray-300"
            >
              {channel}
            </span>
          ))}
        </div>
      </section>

      {/* Automation playbook */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold">How this business runs itself</h2>
        <div className="mt-4 glass-card p-6">
          <p className="leading-relaxed text-gray-300">
            Webhook listeners process every form submission in real time — no polling,
            no manual checks. WhatsApp messages sent via Meta&apos;s Cloud API with
            zero human involvement. Google Sheets rows appended via service account
            credentials stored securely. Follow-up sequences managed by a cron-based
            queue that checks due dates every 15 minutes. Razorpay handles all
            billing, renewals, and failed payment retries. Support AI agent trained
            on product docs handles ~80% of tickets. Owner reviews a daily Slack
            digest of delivery errors only.
          </p>
          <p className="mt-4 text-sm text-gray-400">
            <strong className="text-gray-300">MVP estimate:</strong> Node.js +
            Supabase + WhatsApp Cloud API + Google Sheets API; 3 weeks solo dev for
            core routing and template engine
          </p>
        </div>
      </section>

      {/* Source pain points */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold">Source pain points</h2>
        <div className="mt-4 space-y-4">
          <div className="glass-card p-6">
            <p className="font-medium text-gray-200">
              Small businesses spend countless daily hours manually transferring
              information from forms or emails into spreadsheets, sending repetitive
              WhatsApp messages, following up on invoices, compiling reports
            </p>
            <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <p className="text-gray-500">Persona</p>
                <p className="text-gray-300">Small business owners in India</p>
              </div>
              <div>
                <p className="text-gray-500">Workaround</p>
                <p className="text-gray-300">
                  Manual data entry, spreadsheets, repetitive messaging
                </p>
              </div>
              <div>
                <p className="text-gray-500">Frequency</p>
                <p className="text-gray-300">Daily</p>
              </div>
              <div>
                <p className="text-gray-500">WTP signal</p>
                <p className="text-gray-300">
                  Already paying ₹5,000–₹30,000 one-time for automation solutions
                </p>
              </div>
            </div>
            <a
              href="https://www.reddit.com/r/indianstartups/comments/1u775qs/i_save_small_businesses_20_hoursweek_with_simple/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-brand-400 hover:underline"
            >
              View source on Reddit →
            </a>
          </div>
        </div>
      </section>

      {/* About Idea Miner */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold">About this program</h2>
        <div className="mt-4 glass-card p-6">
          <p className="leading-relaxed text-gray-300">
            This demo was auto-built by the <strong>Idea Miner</strong> pipeline: a
            twice-daily research program that mines Reddit, Hacker News, Stack
            Exchange, and GitHub for real people describing real pain, scores the
            opportunities, and automatically ships a working mock of every idea that
            passes validation (≥8/9 checks, momentum not declining, not previously
            built). The bar for every idea: low-maintenance recurring revenue that a
            solo owner can run in a few hours a week.
          </p>
          <p className="mt-4 text-xs text-gray-500">
            Generated by Idea Miner run 2026-07-12-pm on 2026-07-13 00:16 UTC
          </p>
        </div>
      </section>

      <div className="text-center">
        <Link
          href="/demo"
          className="inline-block rounded-xl bg-brand-600 px-8 py-3 font-semibold text-white transition hover:bg-brand-500"
        >
          See the Interactive Demo →
        </Link>
      </div>
    </div>
  );
}
