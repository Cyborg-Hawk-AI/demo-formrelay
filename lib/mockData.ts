export interface Submission {
  id: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  form: string;
  source: "Google Forms" | "Typeform" | "Website Embed";
  submittedAt: string;
  whatsappStatus: "delivered" | "sent" | "failed" | "pending";
  sheetStatus: "synced" | "failed" | "pending";
  amount?: string;
  city: string;
  service: string;
}

export interface ConnectedForm {
  id: string;
  name: string;
  source: "Google Forms" | "Typeform" | "Website Embed";
  webhookUrl: string;
  status: "active" | "paused";
  submissionsToday: number;
  lastSubmission: string;
}

export interface WhatsAppTemplate {
  id: string;
  name: string;
  language: string;
  status: "approved" | "pending" | "draft";
  body: string;
  sentCount: number;
}

export interface SheetMapping {
  formField: string;
  sheetColumn: string;
  sample: string;
}

export interface FollowUpStep {
  day: number;
  templateId: string;
  templateName: string;
  sent: number;
  delivered: number;
  failed: number;
}

export interface ActivityItem {
  id: string;
  time: string;
  type: "submission" | "whatsapp" | "sheet" | "sequence" | "webhook";
  message: string;
  status: "success" | "warning" | "error";
}

export const connectedForms: ConnectedForm[] = [
  {
    id: "form-1",
    name: "Coaching Inquiry — Hindi",
    source: "Google Forms",
    webhookUrl: "https://api.formrelay.in/hooks/gf_8k2m9x",
    status: "active",
    submissionsToday: 14,
    lastSubmission: "12 min ago",
  },
  {
    id: "form-2",
    name: "Clinic Appointment Request",
    source: "Typeform",
    webhookUrl: "https://api.formrelay.in/hooks/tf_4p7n1q",
    status: "active",
    submissionsToday: 8,
    lastSubmission: "34 min ago",
  },
  {
    id: "form-3",
    name: "Retail Wholesale Enquiry",
    source: "Website Embed",
    webhookUrl: "https://api.formrelay.in/hooks/we_2j5k8r",
    status: "active",
    submissionsToday: 6,
    lastSubmission: "1 hr ago",
  },
  {
    id: "form-4",
    name: "Summer Camp Registration",
    source: "Google Forms",
    webhookUrl: "https://api.formrelay.in/hooks/gf_9m3l2w",
    status: "paused",
    submissionsToday: 0,
    lastSubmission: "2 days ago",
  },
];

export const submissions: Submission[] = [
  {
    id: "sub-001",
    name: "Priya Sharma",
    phone: "+91 98765 43210",
    email: "priya.sharma@gmail.com",
    company: "Sharma Coaching Centre",
    form: "Coaching Inquiry — Hindi",
    source: "Google Forms",
    submittedAt: "2026-07-13 08:42 IST",
    whatsappStatus: "delivered",
    sheetStatus: "synced",
    amount: "₹15,000",
    city: "Jaipur",
    service: "NEET Coaching",
  },
  {
    id: "sub-002",
    name: "Rajesh Kumar",
    phone: "+91 87654 32109",
    email: "rajesh.k@outlook.com",
    company: "Kumar Dental Clinic",
    form: "Clinic Appointment Request",
    source: "Typeform",
    submittedAt: "2026-07-13 08:15 IST",
    whatsappStatus: "delivered",
    sheetStatus: "synced",
    city: "Pune",
    service: "Root Canal Consultation",
  },
  {
    id: "sub-003",
    name: "Ananya Reddy",
    phone: "+91 99887 76655",
    email: "ananya@reddytextiles.in",
    company: "Reddy Textiles",
    form: "Retail Wholesale Enquiry",
    source: "Website Embed",
    submittedAt: "2026-07-13 07:58 IST",
    whatsappStatus: "sent",
    sheetStatus: "synced",
    amount: "₹2,40,000",
    city: "Hyderabad",
    service: "Bulk Cotton Order",
  },
  {
    id: "sub-004",
    name: "Vikram Singh",
    phone: "+91 91234 56789",
    email: "vikram.singh@yahoo.in",
    company: "Singh Fitness Studio",
    form: "Coaching Inquiry — Hindi",
    source: "Google Forms",
    submittedAt: "2026-07-13 07:30 IST",
    whatsappStatus: "delivered",
    sheetStatus: "synced",
    amount: "₹8,500",
    city: "Delhi",
    service: "Personal Training",
  },
  {
    id: "sub-005",
    name: "Meera Patel",
    phone: "+91 90123 45678",
    email: "meera.patel@gmail.com",
    company: "Patel Beauty Salon",
    form: "Clinic Appointment Request",
    source: "Typeform",
    submittedAt: "2026-07-13 06:55 IST",
    whatsappStatus: "failed",
    sheetStatus: "synced",
    city: "Ahmedabad",
    service: "Skin Consultation",
  },
  {
    id: "sub-006",
    name: "Arjun Nair",
    phone: "+91 88990 11223",
    email: "arjun.nair@keralacafe.com",
    company: "Nair's Kerala Cafe",
    form: "Retail Wholesale Enquiry",
    source: "Website Embed",
    submittedAt: "2026-07-13 06:20 IST",
    whatsappStatus: "delivered",
    sheetStatus: "synced",
    amount: "₹45,000",
    city: "Bengaluru",
    service: "Catering Order",
  },
  {
    id: "sub-007",
    name: "Kavita Desai",
    phone: "+91 77665 44332",
    email: "kavita.desai@hotmail.com",
    company: "Desai Tuition Classes",
    form: "Coaching Inquiry — Hindi",
    source: "Google Forms",
    submittedAt: "2026-07-12 22:10 IST",
    whatsappStatus: "delivered",
    sheetStatus: "synced",
    amount: "₹12,000",
    city: "Surat",
    service: "Class 12 Maths",
  },
  {
    id: "sub-008",
    name: "Suresh Iyer",
    phone: "+91 76543 21098",
    email: "suresh.iyer@cognizant.com",
    company: "Iyer Home Services",
    form: "Retail Wholesale Enquiry",
    source: "Website Embed",
    submittedAt: "2026-07-12 20:45 IST",
    whatsappStatus: "pending",
    sheetStatus: "pending",
    amount: "₹18,500",
    city: "Chennai",
    service: "AC Installation",
  },
  {
    id: "sub-009",
    name: "Fatima Khan",
    phone: "+91 95432 10987",
    email: "fatima.khan@gmail.com",
    company: "Khan's Boutique",
    form: "Clinic Appointment Request",
    source: "Typeform",
    submittedAt: "2026-07-12 19:30 IST",
    whatsappStatus: "delivered",
    sheetStatus: "failed",
    city: "Lucknow",
    service: "Bridal Consultation",
  },
  {
    id: "sub-010",
    name: "Deepak Joshi",
    phone: "+91 84321 09876",
    email: "deepak.joshi@joshihardware.in",
    company: "Joshi Hardware Store",
    form: "Retail Wholesale Enquiry",
    source: "Website Embed",
    submittedAt: "2026-07-12 18:15 IST",
    whatsappStatus: "delivered",
    sheetStatus: "synced",
    amount: "₹3,20,000",
    city: "Indore",
    service: "Hardware Bulk Supply",
  },
];

export const whatsappTemplates: WhatsAppTemplate[] = [
  {
    id: "tpl-1",
    name: "lead_welcome_hi",
    language: "Hindi",
    status: "approved",
    body: "नमस्ते {{1}}! आपकी {{2}} के लिए पूछताछ मिल गई है। हम 2 घंटे में कॉल करेंगे। — {{3}}",
    sentCount: 342,
  },
  {
    id: "tpl-2",
    name: "lead_welcome_en",
    language: "English",
    status: "approved",
    body: "Hi {{1}}! Thanks for your enquiry about {{2}}. We'll call you within 2 hours. — {{3}}",
    sentCount: 218,
  },
  {
    id: "tpl-3",
    name: "followup_day1",
    language: "Hindi",
    status: "approved",
    body: "नमस्ते {{1}}, कल आपने {{2}} के बारे में पूछा था। क्या हम आपकी मदद कर सकते हैं?",
    sentCount: 156,
  },
  {
    id: "tpl-4",
    name: "followup_day3",
    language: "Hindi",
    status: "approved",
    body: "{{1}} जी, आपकी {{2}} enquiry अभी भी open है। आज call करने का सही समय बताएं?",
    sentCount: 89,
  },
  {
    id: "tpl-5",
    name: "followup_day7",
    language: "English",
    status: "pending",
    body: "Hi {{1}}, just checking in on your {{2}} enquiry from last week. Still interested?",
    sentCount: 0,
  },
];

export const sheetMappings: SheetMapping[] = [
  { formField: "Full Name", sheetColumn: "A — Name", sample: "Priya Sharma" },
  { formField: "Phone Number", sheetColumn: "B — Phone", sample: "+91 98765 43210" },
  { formField: "Email", sheetColumn: "C — Email", sample: "priya.sharma@gmail.com" },
  { formField: "Service Interest", sheetColumn: "D — Service", sample: "NEET Coaching" },
  { formField: "City", sheetColumn: "E — City", sample: "Jaipur" },
  { formField: "Budget", sheetColumn: "F — Amount", sample: "₹15,000" },
  { formField: "Submitted At", sheetColumn: "G — Timestamp", sample: "2026-07-13 08:42" },
  { formField: "Source Form", sheetColumn: "H — Form Name", sample: "Coaching Inquiry" },
];

export const followUpSteps: FollowUpStep[] = [
  {
    day: 1,
    templateId: "tpl-3",
    templateName: "followup_day1",
    sent: 156,
    delivered: 148,
    failed: 8,
  },
  {
    day: 3,
    templateId: "tpl-4",
    templateName: "followup_day3",
    sent: 89,
    delivered: 82,
    failed: 7,
  },
  {
    day: 7,
    templateId: "tpl-5",
    templateName: "followup_day7",
    sent: 34,
    delivered: 31,
    failed: 3,
  },
];

export const activityFeed: ActivityItem[] = [
  {
    id: "act-1",
    time: "08:42",
    type: "submission",
    message: "New submission from Priya Sharma via Coaching Inquiry — Hindi",
    status: "success",
  },
  {
    id: "act-2",
    time: "08:42",
    type: "whatsapp",
    message: "WhatsApp delivered to +91 98765 43210 (lead_welcome_hi)",
    status: "success",
  },
  {
    id: "act-3",
    time: "08:42",
    type: "sheet",
    message: "Row appended to 'Leads Master — July 2026' spreadsheet",
    status: "success",
  },
  {
    id: "act-4",
    time: "08:15",
    type: "submission",
    message: "New submission from Rajesh Kumar via Clinic Appointment Request",
    status: "success",
  },
  {
    id: "act-5",
    time: "08:15",
    type: "whatsapp",
    message: "WhatsApp delivered to +91 87654 32109 (lead_welcome_en)",
    status: "success",
  },
  {
    id: "act-6",
    time: "06:55",
    type: "whatsapp",
    message: "WhatsApp failed for Meera Patel — invalid phone format",
    status: "error",
  },
  {
    id: "act-7",
    time: "06:30",
    type: "sequence",
    message: "Day 3 follow-up sent to 12 leads in 'Coaching Inquiry' sequence",
    status: "success",
  },
  {
    id: "act-8",
    time: "06:00",
    type: "sequence",
    message: "Day 1 follow-up sent to 28 leads across 3 forms",
    status: "success",
  },
  {
    id: "act-9",
    time: "05:45",
    type: "sheet",
    message: "Sheet sync failed for Fatima Khan — quota exceeded, retrying",
    status: "warning",
  },
  {
    id: "act-10",
    time: "05:30",
    type: "webhook",
    message: "Webhook received from Typeform (Clinic Appointment Request)",
    status: "success",
  },
];

export const dailyVolume = [
  { day: "Mon", submissions: 42, delivered: 39, failed: 3 },
  { day: "Tue", submissions: 38, delivered: 36, failed: 2 },
  { day: "Wed", submissions: 51, delivered: 48, failed: 3 },
  { day: "Thu", submissions: 45, delivered: 43, failed: 2 },
  { day: "Fri", submissions: 58, delivered: 54, failed: 4 },
  { day: "Sat", submissions: 34, delivered: 32, failed: 2 },
  { day: "Sun", submissions: 28, delivered: 26, failed: 2 },
];

export const dashboardStats = {
  submissionsToday: 28,
  submissionsMonth: 487,
  whatsappDelivered: 462,
  whatsappFailed: 12,
  sheetSynced: 479,
  activeForms: 3,
  planUsage: 487,
  planLimit: 500,
  planName: "Starter",
};
