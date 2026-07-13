"use client";

import { useState, useCallback } from "react";
import { DevNote } from "@/components/DevNote";
import { Toast } from "@/components/Toast";
import {
  connectedForms,
  submissions as initialSubmissions,
  whatsappTemplates,
  sheetMappings as initialMappings,
  followUpSteps,
  activityFeed,
  dailyVolume,
  dashboardStats,
  type ConnectedForm,
  type Submission,
} from "@/lib/mockData";

type Tab = "dashboard" | "forms" | "whatsapp" | "sheets" | "sequences" | "submissions";

export default function DemoApp() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" as "success" | "info" | "error" });
  const [forms, setForms] = useState(connectedForms);
  const [subs, setSubs] = useState(initialSubmissions);
  const [mappings, setMappings] = useState(initialMappings);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [formFilter, setFormFilter] = useState<string>("all");
  const [selectedSub, setSelectedSub] = useState<Submission | null>(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(whatsappTemplates[0]);
  const [showWebhookModal, setShowWebhookModal] = useState<ConnectedForm | null>(null);
  const [showConnectWizard, setShowConnectWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [newFormName, setNewFormName] = useState("");
  const [newFormSource, setNewFormSource] = useState<"Google Forms" | "Typeform" | "Website Embed">("Google Forms");
  const [sequencesEnabled, setSequencesEnabled] = useState(true);
  const [selectedSequenceDay, setSelectedSequenceDay] = useState(1);
  const [activityFilter, setActivityFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState("7d");

  const showToast = useCallback((message: string, type: "success" | "info" | "error" = "success") => {
    setToast({ visible: true, message, type });
  }, []);

  const closeToast = useCallback(() => {
    setToast((t) => ({ ...t, visible: false }));
  }, []);

  const toggleFormStatus = (id: string) => {
    setForms((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, status: f.status === "active" ? "paused" : "active" } : f
      )
    );
    showToast("Form status updated");
  };

  const filteredSubs = subs.filter((s) => {
    if (statusFilter !== "all" && s.whatsappStatus !== statusFilter) return false;
    if (formFilter !== "all" && s.form !== formFilter) return false;
    return true;
  });

  const filteredActivity = activityFeed.filter(
    (a) => activityFilter === "all" || a.type === activityFilter
  );

  const maxVolume = Math.max(...dailyVolume.map((d) => d.submissions));

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "forms", label: "Forms & Webhooks", icon: "🔗" },
    { id: "whatsapp", label: "WhatsApp", icon: "💬" },
    { id: "sheets", label: "Google Sheets", icon: "📋" },
    { id: "sequences", label: "Follow-Ups", icon: "⏰" },
    { id: "submissions", label: "Submissions", icon: "📥" },
  ];

  const handleAddForm = () => {
    const newForm: ConnectedForm = {
      id: `form-${Date.now()}`,
      name: newFormName || "New Form",
      source: newFormSource,
      webhookUrl: `https://api.formrelay.in/hooks/${Math.random().toString(36).slice(2, 10)}`,
      status: "active",
      submissionsToday: 0,
      lastSubmission: "Never",
    };
    setForms((prev) => [...prev, newForm]);
    setShowConnectWizard(false);
    setWizardStep(1);
    setNewFormName("");
    showToast(`Form "${newForm.name}" connected successfully!`);
  };

  const copyWebhook = (url: string) => {
    navigator.clipboard?.writeText(url);
    showToast("Webhook URL copied to clipboard", "info");
  };

  const resendWhatsApp = (sub: Submission) => {
    setSubs((prev) =>
      prev.map((s) =>
        s.id === sub.id ? { ...s, whatsappStatus: "sent" as const } : s
      )
    );
    showToast(`WhatsApp resent to ${sub.name}`);
    setTimeout(() => {
      setSubs((prev) =>
        prev.map((s) =>
          s.id === sub.id ? { ...s, whatsappStatus: "delivered" as const } : s
        )
      );
    }, 1500);
  };

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      delivered: "bg-brand-900/50 text-brand-300 ring-brand-500/30",
      sent: "bg-blue-900/50 text-blue-300 ring-blue-500/30",
      failed: "bg-red-900/50 text-red-300 ring-red-500/30",
      pending: "bg-yellow-900/50 text-yellow-300 ring-yellow-500/30",
      synced: "bg-brand-900/50 text-brand-300 ring-brand-500/30",
      active: "bg-brand-900/50 text-brand-300 ring-brand-500/30",
      paused: "bg-gray-700/50 text-gray-400 ring-gray-500/30",
      approved: "bg-brand-900/50 text-brand-300 ring-brand-500/30",
      draft: "bg-gray-700/50 text-gray-400 ring-gray-500/30",
    };
    return (
      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${styles[status] || styles.pending}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-surface-900">
      <Toast message={toast.message} visible={toast.visible} onClose={closeToast} type={toast.type} />

      <div className="border-b border-white/10 bg-surface-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-xl font-bold">
              FormRelay <span className="text-brand-400">Dashboard</span>
            </h1>
            <p className="text-sm text-gray-400">
              Sharma Coaching Centre · {dashboardStats.planName} Plan
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => {
                setDateRange(e.target.value);
                showToast(`Date range changed to ${e.target.value}`, "info");
              }}
              className="rounded-lg border border-white/10 bg-surface-700 px-3 py-1.5 text-sm text-gray-300"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button
              onClick={() => showToast("Settings panel opened (mock)", "info")}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-gray-300 hover:bg-surface-700"
            >
              ⚙️ Settings
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl gap-0 lg:gap-6">
        <aside className="hidden w-56 shrink-0 border-r border-white/10 p-4 lg:block">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  activeTab === tab.id
                    ? "bg-brand-600/20 text-brand-300 ring-1 ring-brand-500/30"
                    : "text-gray-400 hover:bg-surface-700 hover:text-gray-200"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
          <div className="mt-6 rounded-lg border border-white/10 bg-surface-800 p-3">
            <p className="text-xs text-gray-500">Plan usage</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-600">
              <div
                className="h-full rounded-full bg-brand-500 transition-all"
                style={{ width: `${(dashboardStats.planUsage / dashboardStats.planLimit) * 100}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-gray-400">
              {dashboardStats.planUsage} / {dashboardStats.planLimit} submissions
            </p>
            <button
              onClick={() => showToast("Upgrade to Growth plan — ₹2,499/month", "info")}
              className="mt-2 w-full rounded-md bg-brand-600/20 py-1.5 text-xs font-medium text-brand-400 hover:bg-brand-600/30"
            >
              Upgrade Plan
            </button>
          </div>
        </aside>

        <div className="flex w-full overflow-x-auto border-b border-white/10 lg:hidden">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 px-4 py-3 text-xs font-medium ${
                activeTab === tab.id ? "border-b-2 border-brand-500 text-brand-400" : "text-gray-400"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 p-4 sm:p-6">
          {activeTab === "dashboard" && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-lg font-semibold">
                Overview
                <DevNote title="Dashboard">
                  Production: real-time metrics from Supabase, aggregated by cron. WhatsApp delivery receipts update via Meta webhook callbacks.
                </DevNote>
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Submissions Today", value: dashboardStats.submissionsToday, change: "+12%" },
                  { label: "This Month", value: dashboardStats.submissionsMonth, change: "+8%" },
                  { label: "WhatsApp Delivered", value: dashboardStats.whatsappDelivered, change: "98.2%" },
                  { label: "Delivery Failures", value: dashboardStats.whatsappFailed, change: "-2 from yesterday" },
                ].map((stat) => (
                  <button
                    key={stat.label}
                    onClick={() => showToast(`Drill-down: ${stat.label}`, "info")}
                    className="glass-card p-4 text-left transition hover:border-brand-500/30"
                  >
                    <p className="text-xs text-gray-400">{stat.label}</p>
                    <p className="mt-1 text-2xl font-bold text-white">{stat.value}</p>
                    <p className="mt-1 text-xs text-brand-400">{stat.change}</p>
                  </button>
                ))}
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">
                    Submission Volume
                    <DevNote title="Volume Chart">
                      Production: Chart.js or Recharts fed by daily aggregation job. Data from submissions table grouped by date.
                    </DevNote>
                  </h3>
                  <div className="flex gap-4 text-xs">
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-brand-500" /> Submissions</span>
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Delivered</span>
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-400" /> Failed</span>
                  </div>
                </div>
                <div className="mt-6 flex items-end justify-between gap-2" style={{ height: 160 }}>
                  {dailyVolume.map((d) => (
                    <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
                      <div className="flex w-full items-end justify-center gap-0.5" style={{ height: 120 }}>
                        <div
                          className="w-3 rounded-t bg-brand-500/80 transition-all hover:bg-brand-400"
                          style={{ height: `${(d.submissions / maxVolume) * 100}%` }}
                          title={`${d.submissions} submissions`}
                        />
                        <div
                          className="w-3 rounded-t bg-emerald-400/80"
                          style={{ height: `${(d.delivered / maxVolume) * 100}%` }}
                        />
                        <div
                          className="w-3 rounded-t bg-red-400/80"
                          style={{ height: `${(d.failed / maxVolume) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">
                    Live Activity
                    <DevNote title="Activity Feed">
                      Production: Server-Sent Events or WebSocket stream from webhook processor. Each event logged to activity table.
                    </DevNote>
                  </h3>
                  <select
                    value={activityFilter}
                    onChange={(e) => setActivityFilter(e.target.value)}
                    className="rounded-md border border-white/10 bg-surface-700 px-2 py-1 text-xs text-gray-300"
                  >
                    <option value="all">All events</option>
                    <option value="submission">Submissions</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="sheet">Sheets</option>
                    <option value="sequence">Sequences</option>
                  </select>
                </div>
                <div className="mt-4 max-h-64 space-y-2 overflow-y-auto">
                  {filteredActivity.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => showToast(`Event: ${item.message}`, "info")}
                      className="flex w-full items-start gap-3 rounded-lg p-2 text-left text-sm transition hover:bg-surface-700/50"
                    >
                      <span className="shrink-0 text-xs text-gray-500">{item.time}</span>
                      <span className={`shrink-0 text-xs ${
                        item.status === "success" ? "text-brand-400" : item.status === "error" ? "text-red-400" : "text-yellow-400"
                      }`}>
                        {item.type === "submission" ? "📥" : item.type === "whatsapp" ? "💬" : item.type === "sheet" ? "📋" : item.type === "sequence" ? "⏰" : "🔗"}
                      </span>
                      <span className="text-gray-300">{item.message}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "forms" && (
            <div className="animate-fade-in space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Connected Forms
                  <DevNote title="Form Webhooks">
                    Production: Each form gets a unique webhook endpoint. POST payload parsed per source (Google Forms JSON, Typeform webhook schema). Verified via HMAC signature.
                  </DevNote>
                </h2>
                <button
                  onClick={() => { setShowConnectWizard(true); setWizardStep(1); }}
                  className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-500"
                >
                  + Connect Form
                </button>
              </div>

              <div className="space-y-3">
                {forms.map((form) => (
                  <div key={form.id} className="glass-card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-600 text-lg">
                        {form.source === "Google Forms" ? "📝" : form.source === "Typeform" ? "📋" : "🌐"}
                      </div>
                      <div>
                        <p className="font-medium">{form.name}</p>
                        <p className="text-xs text-gray-400">{form.source} · {form.submissionsToday} today · Last: {form.lastSubmission}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {statusBadge(form.status)}
                      <button
                        onClick={() => setShowWebhookModal(form)}
                        className="rounded-md border border-white/10 px-3 py-1 text-xs text-gray-300 hover:bg-surface-700"
                      >
                        View Webhook
                      </button>
                      <button
                        onClick={() => toggleFormStatus(form.id)}
                        className="rounded-md border border-white/10 px-3 py-1 text-xs text-gray-300 hover:bg-surface-700"
                      >
                        {form.status === "active" ? "Pause" : "Resume"}
                      </button>
                      <button
                        onClick={() => { setActiveTab("submissions"); setFormFilter(form.name); }}
                        className="rounded-md border border-white/10 px-3 py-1 text-xs text-gray-300 hover:bg-surface-700"
                      >
                        View Leads
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "whatsapp" && (
            <div className="animate-fade-in space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  WhatsApp Templates
                  <DevNote title="WhatsApp Business API">
                    Production: Templates submitted to Meta for approval. On submission, Cloud API sends template message with mapped variables. Delivery status via webhook callbacks.
                  </DevNote>
                </h2>
                <button
                  onClick={() => { setSelectedTemplate(whatsappTemplates[0]); setShowTemplateModal(true); }}
                  className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-500"
                >
                  + New Template
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {whatsappTemplates.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => { setSelectedTemplate(tpl); setShowTemplateModal(true); }}
                    className="glass-card p-4 text-left transition hover:border-brand-500/30"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-sm font-medium text-brand-300">{tpl.name}</p>
                      {statusBadge(tpl.status)}
                    </div>
                    <p className="mt-1 text-xs text-gray-400">{tpl.language} · {tpl.sentCount} sent</p>
                    <p className="mt-3 line-clamp-2 text-sm text-gray-300">{tpl.body}</p>
                  </button>
                ))}
              </div>

              <div className="glass-card p-4">
                <h3 className="text-sm font-medium">
                  Auto-send on new submission
                  <DevNote title="Instant WhatsApp">
                    Production: Webhook handler queues WhatsApp job immediately. Worker picks template, maps variables from form fields, calls Meta Cloud API.
                  </DevNote>
                </h3>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-300">Default template: lead_welcome_hi</p>
                    <p className="text-xs text-gray-500">Triggers on every new form submission</p>
                  </div>
                  <button
                    onClick={() => showToast("Default template changed to lead_welcome_en")}
                    className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-gray-300 hover:bg-surface-700"
                  >
                    Change Template
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "sheets" && (
            <div className="animate-fade-in space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Google Sheets Mapping
                  <DevNote title="Sheets API">
                    Production: Service account credentials stored in Secrets Manager. sheets.spreadsheets.values.append called on each submission with mapped column order.
                  </DevNote>
                </h2>
                <button
                  onClick={() => showToast("Connected to 'Leads Master — July 2026'", "info")}
                  className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-surface-700"
                >
                  📊 Leads Master — July 2026
                </button>
              </div>

              <div className="glass-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-surface-700/50">
                      <th className="px-4 py-3 text-left font-medium text-gray-400">Form Field</th>
                      <th className="px-4 py-3 text-center text-gray-500">→</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-400">Sheet Column</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-400">Sample</th>
                      <th className="px-4 py-3 text-right font-medium text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mappings.map((m, i) => (
                      <tr key={m.formField} className="border-b border-white/5 hover:bg-surface-700/30">
                        <td className="px-4 py-3 text-gray-200">{m.formField}</td>
                        <td className="px-4 py-3 text-center text-brand-400">→</td>
                        <td className="px-4 py-3 font-mono text-xs text-brand-300">{m.sheetColumn}</td>
                        <td className="px-4 py-3 text-gray-400">{m.sample}</td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => {
                              const cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
                              const nextCol = cols[(i + 1) % cols.length];
                              setMappings((prev) =>
                                prev.map((row, idx) =>
                                  idx === i ? { ...row, sheetColumn: `${nextCol} — ${row.formField}` } : row
                                )
                              );
                              showToast(`Remapped ${m.formField} to column ${nextCol}`);
                            }}
                            className="text-xs text-brand-400 hover:underline"
                          >
                            Remap
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setMappings((prev) => [
                      ...prev,
                      { formField: "Referral Source", sheetColumn: "I — Referral", sample: "Instagram" },
                    ]);
                    showToast("New field mapping added");
                  }}
                  className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-surface-700"
                >
                  + Add Field
                </button>
                <button
                  onClick={() => showToast("Test row appended to spreadsheet!", "success")}
                  className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-500"
                >
                  Send Test Row
                </button>
              </div>
            </div>
          )}

          {activeTab === "sequences" && (
            <div className="animate-fade-in space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Follow-Up Sequences
                  <DevNote title="Cron Scheduler">
                    Production: Cron job runs every 15 min, queries leads where follow_up_due_at &lt;= now(). Sends appropriate template, updates next_due date. Managed via BullMQ or similar queue.
                  </DevNote>
                </h2>
                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={sequencesEnabled}
                    onChange={(e) => {
                      setSequencesEnabled(e.target.checked);
                      showToast(e.target.checked ? "Sequences enabled" : "Sequences paused");
                    }}
                    className="rounded border-white/20 bg-surface-700 text-brand-500"
                  />
                  Sequences {sequencesEnabled ? "On" : "Off"}
                </label>
              </div>

              <div className="flex gap-2">
                {[1, 3, 7].map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedSequenceDay(day)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                      selectedSequenceDay === day
                        ? "bg-brand-600 text-white"
                        : "border border-white/10 text-gray-400 hover:bg-surface-700"
                    }`}
                  >
                    Day {day}
                  </button>
                ))}
              </div>

              {followUpSteps
                .filter((s) => s.day === selectedSequenceDay)
                .map((step) => (
                  <div key={step.day} className="glass-card p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Day {step.day} Follow-Up</h3>
                        <p className="text-sm text-gray-400">Template: {step.templateName}</p>
                      </div>
                      <button
                        onClick={() => showToast(`Sequence preview for ${step.templateName}`, "info")}
                        className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-gray-300 hover:bg-surface-700"
                      >
                        Preview Message
                      </button>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div className="rounded-lg bg-surface-700/50 p-3 text-center">
                        <p className="text-2xl font-bold text-white">{step.sent}</p>
                        <p className="text-xs text-gray-400">Sent</p>
                      </div>
                      <div className="rounded-lg bg-surface-700/50 p-3 text-center">
                        <p className="text-2xl font-bold text-brand-400">{step.delivered}</p>
                        <p className="text-xs text-gray-400">Delivered</p>
                      </div>
                      <div className="rounded-lg bg-surface-700/50 p-3 text-center">
                        <p className="text-2xl font-bold text-red-400">{step.failed}</p>
                        <p className="text-xs text-gray-400">Failed</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="mb-2 text-xs text-gray-500">Upcoming sends (next cron run)</p>
                      <div className="space-y-2">
                        {["Vikram Singh — Day 1 due in 2h", "Ananya Reddy — Day 3 due in 6h", "Kavita Desai — Day 7 due tomorrow"].map((item) => (
                          <button
                            key={item}
                            onClick={() => showToast(`Scheduled: ${item}`, "info")}
                            className="flex w-full items-center justify-between rounded-lg bg-surface-700/30 px-3 py-2 text-sm text-gray-300 hover:bg-surface-700/50"
                          >
                            <span>{item}</span>
                            <span className="text-xs text-brand-400">View →</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

              <button
                onClick={() => showToast("Custom sequence builder opened", "info")}
                className="w-full rounded-lg border border-dashed border-white/20 py-3 text-sm text-gray-400 hover:border-brand-500/50 hover:text-brand-400"
              >
                + Create Custom Sequence
              </button>
            </div>
          )}

          {activeTab === "submissions" && (
            <div className="animate-fade-in space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">
                  All Submissions
                  <DevNote title="Submission Log">
                    Production: Every webhook payload stored in submissions table with delivery status columns. Filterable, exportable to CSV.
                  </DevNote>
                </h2>
                <div className="flex flex-wrap gap-2">
                  <select
                    value={formFilter}
                    onChange={(e) => setFormFilter(e.target.value)}
                    className="rounded-lg border border-white/10 bg-surface-700 px-3 py-1.5 text-xs text-gray-300"
                  >
                    <option value="all">All forms</option>
                    {forms.map((f) => (
                      <option key={f.id} value={f.name}>{f.name}</option>
                    ))}
                  </select>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="rounded-lg border border-white/10 bg-surface-700 px-3 py-1.5 text-xs text-gray-300"
                  >
                    <option value="all">All statuses</option>
                    <option value="delivered">Delivered</option>
                    <option value="sent">Sent</option>
                    <option value="failed">Failed</option>
                    <option value="pending">Pending</option>
                  </select>
                  <button
                    onClick={() => showToast("CSV export downloaded (mock)", "info")}
                    className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-gray-300 hover:bg-surface-700"
                  >
                    Export CSV
                  </button>
                </div>
              </div>

              <div className="glass-card overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-surface-700/50">
                      <th className="px-4 py-3 text-left font-medium text-gray-400">Lead</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-400">Form</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-400">Submitted</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-400">WhatsApp</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-400">Sheet</th>
                      <th className="px-4 py-3 text-right font-medium text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubs.map((sub) => (
                      <tr
                        key={sub.id}
                        onClick={() => setSelectedSub(sub)}
                        className="cursor-pointer border-b border-white/5 hover:bg-surface-700/30"
                      >
                        <td className="px-4 py-3">
                          <p className="font-medium text-gray-200">{sub.name}</p>
                          <p className="text-xs text-gray-500">{sub.phone}</p>
                        </td>
                        <td className="px-4 py-3 text-gray-400">{sub.form}</td>
                        <td className="px-4 py-3 text-xs text-gray-500">{sub.submittedAt}</td>
                        <td className="px-4 py-3">{statusBadge(sub.whatsappStatus)}</td>
                        <td className="px-4 py-3">{statusBadge(sub.sheetStatus)}</td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={(e) => { e.stopPropagation(); resendWhatsApp(sub); }}
                            className="text-xs text-brand-400 hover:underline"
                          >
                            Resend
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500">Showing {filteredSubs.length} of {subs.length} submissions</p>
            </div>
          )}
        </div>
      </div>

      {selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setSelectedSub(null)}>
          <div className="glass-card w-full max-w-lg animate-slide-up p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{selectedSub.name}</h3>
                <p className="text-sm text-gray-400">{selectedSub.company}</p>
              </div>
              <button onClick={() => setSelectedSub(null)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-gray-500">Phone</p><p>{selectedSub.phone}</p></div>
              <div><p className="text-gray-500">Email</p><p>{selectedSub.email}</p></div>
              <div><p className="text-gray-500">City</p><p>{selectedSub.city}</p></div>
              <div><p className="text-gray-500">Service</p><p>{selectedSub.service}</p></div>
              {selectedSub.amount && <div><p className="text-gray-500">Amount</p><p>{selectedSub.amount}</p></div>}
              <div><p className="text-gray-500">Source</p><p>{selectedSub.source}</p></div>
            </div>
            <div className="mt-4 flex gap-3">
              <div className="flex-1 rounded-lg bg-surface-700/50 p-3 text-center">
                <p className="text-xs text-gray-500">WhatsApp</p>
                {statusBadge(selectedSub.whatsappStatus)}
              </div>
              <div className="flex-1 rounded-lg bg-surface-700/50 p-3 text-center">
                <p className="text-xs text-gray-500">Sheet</p>
                {statusBadge(selectedSub.sheetStatus)}
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => { resendWhatsApp(selectedSub); setSelectedSub(null); }}
                className="flex-1 rounded-lg bg-brand-600 py-2 text-sm font-medium text-white hover:bg-brand-500"
              >
                Resend WhatsApp
              </button>
              <button
                onClick={() => { showToast("Synced to sheet"); setSelectedSub(null); }}
                className="flex-1 rounded-lg border border-white/10 py-2 text-sm text-gray-300 hover:bg-surface-700"
              >
                Re-sync Sheet
              </button>
            </div>
          </div>
        </div>
      )}

      {showWebhookModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowWebhookModal(null)}>
          <div className="glass-card w-full max-w-lg animate-slide-up p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold">Webhook URL</h3>
            <p className="mt-1 text-sm text-gray-400">{showWebhookModal.name}</p>
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-surface-700 p-3">
              <code className="flex-1 overflow-x-auto text-xs text-brand-300">{showWebhookModal.webhookUrl}</code>
              <button
                onClick={() => copyWebhook(showWebhookModal.webhookUrl)}
                className="shrink-0 rounded-md bg-brand-600 px-3 py-1 text-xs text-white hover:bg-brand-500"
              >
                Copy
              </button>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Paste this URL in your {showWebhookModal.source} webhook settings. Submissions will route automatically.
            </p>
            <button
              onClick={() => { showToast("Test webhook sent!", "success"); setShowWebhookModal(null); }}
              className="mt-4 w-full rounded-lg bg-brand-600 py-2 text-sm font-medium text-white hover:bg-brand-500"
            >
              Send Test Webhook
            </button>
          </div>
        </div>
      )}

      {showConnectWizard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowConnectWizard(false)}>
          <div className="glass-card w-full max-w-lg animate-slide-up p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Connect a Form</h3>
              <span className="text-xs text-gray-500">Step {wizardStep} of 3</span>
            </div>
            {wizardStep === 1 && (
              <div className="mt-4 space-y-4">
                <p className="text-sm text-gray-400">Choose your form source:</p>
                {(["Google Forms", "Typeform", "Website Embed"] as const).map((src) => (
                  <button
                    key={src}
                    onClick={() => { setNewFormSource(src); setWizardStep(2); }}
                    className={`flex w-full items-center gap-3 rounded-lg border p-4 text-left transition ${
                      newFormSource === src ? "border-brand-500/50 bg-brand-900/20" : "border-white/10 hover:bg-surface-700"
                    }`}
                  >
                    <span className="text-2xl">{src === "Google Forms" ? "📝" : src === "Typeform" ? "📋" : "🌐"}</span>
                    <span className="font-medium">{src}</span>
                  </button>
                ))}
              </div>
            )}
            {wizardStep === 2 && (
              <div className="mt-4 space-y-4">
                <label className="block text-sm text-gray-400">Form name</label>
                <input
                  value={newFormName}
                  onChange={(e) => setNewFormName(e.target.value)}
                  placeholder="e.g. Product Enquiry Form"
                  className="w-full rounded-lg border border-white/10 bg-surface-700 px-3 py-2 text-sm text-white placeholder:text-gray-500"
                />
                <button
                  onClick={() => setWizardStep(3)}
                  className="w-full rounded-lg bg-brand-600 py-2 text-sm font-medium text-white hover:bg-brand-500"
                >
                  Continue
                </button>
              </div>
            )}
            {wizardStep === 3 && (
              <div className="mt-4 space-y-4">
                <p className="text-sm text-gray-400">Your webhook URL is ready:</p>
                <code className="block rounded-lg bg-surface-700 p-3 text-xs text-brand-300">
                  https://api.formrelay.in/hooks/{Math.random().toString(36).slice(2, 10)}
                </code>
                <p className="text-xs text-gray-500">Paste this in your {newFormSource} settings.</p>
                <button
                  onClick={handleAddForm}
                  className="w-full rounded-lg bg-brand-600 py-2 text-sm font-medium text-white hover:bg-brand-500"
                >
                  Finish Setup
                </button>
              </div>
            )}
            {wizardStep > 1 && wizardStep < 3 && (
              <button onClick={() => setWizardStep(wizardStep - 1)} className="mt-3 text-xs text-gray-400 hover:text-white">
                ← Back
              </button>
            )}
          </div>
        </div>
      )}

      {showTemplateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowTemplateModal(false)}>
          <div className="glass-card w-full max-w-lg animate-slide-up p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold">{selectedTemplate.name}</h3>
            <div className="mt-2 flex gap-2">
              {statusBadge(selectedTemplate.status)}
              <span className="text-xs text-gray-400">{selectedTemplate.language}</span>
            </div>
            <div className="mt-4 rounded-lg bg-surface-700 p-4">
              <p className="text-sm leading-relaxed text-gray-200">{selectedTemplate.body}</p>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Variables: {"{{1}}"} = Name, {"{{2}}"} = Service, {"{{3}}"} = Business Name
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => { showToast("Template submitted to Meta for approval"); setShowTemplateModal(false); }}
                className="flex-1 rounded-lg bg-brand-600 py-2 text-sm font-medium text-white hover:bg-brand-500"
              >
                Submit for Approval
              </button>
              <button
                onClick={() => { showToast("Test message sent to +91 98765 43210"); setShowTemplateModal(false); }}
                className="flex-1 rounded-lg border border-white/10 py-2 text-sm text-gray-300 hover:bg-surface-700"
              >
                Send Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
