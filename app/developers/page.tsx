import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Developers — FormRelay Feature Documentation",
  description: "Complete feature map for the FormRelay demo: what's mocked, what's real, and how each integration would work in production.",
};

const features = [
  {
    name: "Dashboard Overview",
    demoPath: "/demo → Dashboard tab",
    description:
      "Real-time submission volume, WhatsApp delivery rates, and live activity feed showing every webhook event, message sent, and sheet sync.",
    tryIt: "Click any stat card for drill-down toast. Change date range dropdown. Filter activity feed by event type.",
    mocked: "All metrics are hardcoded in lib/mockData.ts. Chart bars are CSS-rendered from dailyVolume array. Activity feed is static with client-side filtering.",
    production:
      "Supabase tables: submissions, delivery_events, activity_log. Dashboard queries aggregated via materialized views or edge functions. Activity feed via Server-Sent Events from webhook processor.",
  },
  {
    name: "Form Webhook Connections",
    demoPath: "/demo → Forms & Webhooks tab",
    description:
      "Connect Google Forms, Typeform, or website embeds via unique webhook URLs. Each form gets its own endpoint that receives POST payloads on new submissions.",
    tryIt: "Click '+ Connect Form' for 3-step wizard. 'View Webhook' opens modal with copy button. Toggle Pause/Resume on any form. 'View Leads' filters submissions table.",
    mocked: "Webhook URLs are generated client-side with random strings. No actual HTTP listener. Form list stored in React state.",
    production:
      "Express/Fastify webhook receiver at /hooks/:formId. HMAC signature verification per source. Payload normalizer maps Google Forms JSON, Typeform schema, and custom embed POST bodies to unified submission format. Stored in Supabase submissions table.",
  },
  {
    name: "WhatsApp Template Auto-Send",
    demoPath: "/demo → WhatsApp tab",
    description:
      "Template-based messages sent instantly on new submission via WhatsApp Business Cloud API. Supports Hindi and English approved templates with variable substitution.",
    tryIt: "Click any template card to open editor modal. 'Submit for Approval' and 'Send Test' buttons show toasts. 'Change Template' on auto-send section.",
    mocked: "Templates are static array. No Meta API calls. Resend button in submissions simulates status change with setTimeout.",
    production:
      "On webhook receipt, job queued to BullMQ. Worker calls POST graph.facebook.com/v18.0/{phone_id}/messages with template name and components array. {{1}}, {{2}}, {{3}} mapped from form fields via template_field_mappings table. Delivery receipts update via Meta webhook callback.",
  },
  {
    name: "Google Sheets Field Mapping",
    demoPath: "/demo → Google Sheets tab",
    description:
      "Visual drag-and-drop UI mapping form fields to spreadsheet columns. Every submission auto-appends a row with mapped values.",
    tryIt: "Click 'Remap' on any row to cycle column letters. '+ Add Field' adds new mapping row. 'Send Test Row' shows success toast. Click spreadsheet name button.",
    mocked: "Mappings in React state. No Google API calls. Sample values shown in table.",
    production:
      "Google service account JSON in AWS Secrets Manager. On submission, worker calls sheets.spreadsheets.values.append with spreadsheetId and range. Field order determined by sheet_mappings table. Retry with exponential backoff on quota errors.",
  },
  {
    name: "Follow-Up Sequences (Day 1, 3, 7)",
    demoPath: "/demo → Follow-Ups tab",
    description:
      "Automated WhatsApp follow-up messages scheduled at day 1, day 3, and day 7 after initial submission. Cron-based queue checks due dates every 15 minutes.",
    tryIt: "Toggle sequences on/off. Switch between Day 1/3/7 tabs. Click upcoming sends. 'Preview Message' and 'Create Custom Sequence' buttons.",
    mocked: "Sequence stats are static. Upcoming sends are hardcoded strings. Toggle only affects checkbox state.",
    production:
      "On initial submission, insert follow_up_schedule rows with due_at timestamps. Cron job (every 15 min via node-cron or Vercel Cron) queries WHERE due_at <= NOW() AND status = pending. Sends appropriate template, updates status, sets next sequence step. Failed sends retry 3x then alert via Slack digest.",
  },
  {
    name: "Submissions Table & Filters",
    demoPath: "/demo → Submissions tab",
    description:
      "Searchable, filterable log of every form submission with WhatsApp and Sheets delivery status. Click any row for full lead detail.",
    tryIt: "Filter by form and WhatsApp status. Click row for detail modal. 'Resend' on failed messages. 'Export CSV' button.",
    mocked: "10 hardcoded submissions with realistic Indian names/companies. Filters are client-side. Resend simulates status transition.",
    production:
      "Paginated query from submissions table with JOIN on delivery_events. Full-text search on name/phone/email. CSV export via streaming response. Detail view shows full payload JSON and delivery timeline.",
  },
  {
    name: "Plan Usage & Billing",
    demoPath: "/demo → Sidebar plan widget",
    description:
      "Shows current plan tier, submission count vs limit, and upgrade path. Razorpay handles subscriptions in production.",
    tryIt: "Click 'Upgrade Plan' in sidebar. Plan usage bar reflects 487/500 submissions.",
    mocked: "Static planUsage/planLimit values. Upgrade button shows toast only.",
    production:
      "Razorpay subscription webhooks update plan_tier and submission_limit in users table. Submission counter incremented on each webhook receipt. Hard block at limit with upgrade prompt. Dunning handled by Razorpay retry logic.",
  },
];

const architecture = [
  { step: "1", label: "Form Submit", detail: "User fills Google Form / Typeform / website form" },
  { step: "2", label: "Webhook POST", detail: "Source platform POSTs to api.formrelay.in/hooks/:id" },
  { step: "3", label: "Normalize", detail: "Payload parser maps fields to unified schema" },
  { step: "4", label: "Queue Jobs", detail: "WhatsApp send + Sheets append + schedule follow-ups" },
  { step: "5", label: "Deliver", detail: "Meta Cloud API + Google Sheets API execute in parallel" },
  { step: "6", label: "Update", detail: "Delivery receipts update dashboard via webhooks" },
];

export default function DevelopersPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <p className="text-sm font-medium text-brand-400">Developer Documentation</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          FormRelay Feature Map
        </h1>
        <p className="mt-4 text-gray-400">
          Every feature in the{" "}
          <Link href="/demo" className="text-brand-400 hover:underline">
            live demo
          </Link>{" "}
          documented below: what it does, where to click, what&apos;s mocked, and the
          intended production data flow.
        </p>
      </div>

      {/* Architecture flow */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold">Production Data Flow</h2>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {architecture.map((item, i) => (
            <div key={item.step} className="flex items-center gap-2">
              <div className="glass-card px-3 py-2 text-center">
                <p className="text-xs font-bold text-brand-400">{item.step}</p>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-gray-500">{item.detail}</p>
              </div>
              {i < architecture.length - 1 && (
                <span className="text-gray-600">→</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Feature docs */}
      <div className="space-y-8">
        {features.map((feature, i) => (
          <article key={feature.name} className="glass-card p-6">
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-600/20 text-sm font-bold text-brand-400">
                {i + 1}
              </span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{feature.name}</h3>
                <p className="mt-1 text-sm text-brand-400">{feature.demoPath}</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-300">
                  {feature.description}
                </p>

                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg bg-surface-700/50 p-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Try it
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-400">
                      {feature.tryIt}
                    </p>
                  </div>
                  <div className="rounded-lg bg-surface-700/50 p-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Mocked
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-400">
                      {feature.mocked}
                    </p>
                  </div>
                  <div className="rounded-lg bg-surface-700/50 p-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-400">
                      Production
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-400">
                      {feature.production}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Tech stack */}
      <section className="mt-16 glass-card p-6">
        <h2 className="text-xl font-semibold">Intended Tech Stack</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            { layer: "Frontend", tech: "Next.js 14 App Router + Tailwind CSS" },
            { layer: "Backend", tech: "Node.js API routes + Supabase (Postgres)" },
            { layer: "Queue", tech: "BullMQ + Redis (or Vercel Cron for sequences)" },
            { layer: "WhatsApp", tech: "Meta Cloud API (Business Platform)" },
            { layer: "Sheets", tech: "Google Sheets API v4 (service account)" },
            { layer: "Billing", tech: "Razorpay Subscriptions" },
            { layer: "Deploy", tech: "Vercel (frontend + API) + Supabase (DB)" },
            { layer: "Monitoring", tech: "Slack daily digest + Sentry error tracking" },
          ].map((item) => (
            <div key={item.layer} className="flex items-start gap-3">
              <span className="shrink-0 text-xs font-bold text-brand-400">{item.layer}</span>
              <span className="text-sm text-gray-400">{item.tech}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12 text-center">
        <Link
          href="/demo"
          className="inline-block rounded-xl bg-brand-600 px-8 py-3 font-semibold text-white transition hover:bg-brand-500"
        >
          Open Live Demo →
        </Link>
      </div>
    </div>
  );
}
