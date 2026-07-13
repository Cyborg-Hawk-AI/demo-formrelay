import type { Metadata } from "next";
import DemoApp from "./DemoApp";

export const metadata: Metadata = {
  title: "Live Demo — FormRelay Dashboard",
  description: "Interactive demo of FormRelay: webhook routing, WhatsApp templates, Google Sheets sync, and follow-up sequences.",
};

export default function DemoPage() {
  return <DemoApp />;
}
