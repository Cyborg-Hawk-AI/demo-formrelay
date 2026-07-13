"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
  type?: "success" | "info" | "error";
}

export function Toast({ message, visible, onClose, type = "success" }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  const colors = {
    success: "border-brand-500/50 bg-brand-900/90 text-brand-100",
    info: "border-blue-500/50 bg-blue-900/90 text-blue-100",
    error: "border-red-500/50 bg-red-900/90 text-red-100",
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] animate-slide-up rounded-lg border px-4 py-3 text-sm font-medium shadow-2xl ${colors[type]}`}
    >
      {message}
    </div>
  );
}
