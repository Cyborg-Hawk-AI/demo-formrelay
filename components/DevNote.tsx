"use client";

import { useState } from "react";

interface DevNoteProps {
  title: string;
  children: React.ReactNode;
}

export function DevNote({ title, children }: DevNoteProps) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex align-middle">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-500/20 text-[9px] font-bold text-amber-400 ring-1 ring-amber-500/40 transition hover:bg-amber-500/30"
        aria-label={`DEV NOTE: ${title}`}
        title="DEV NOTE"
      >
        i
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute left-0 top-6 z-50 w-72 animate-fade-in rounded-lg border border-amber-500/30 bg-surface-700 p-3 text-left shadow-xl">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
              DEV NOTE · {title}
            </p>
            <p className="text-xs leading-relaxed text-gray-300">{children}</p>
          </div>
        </>
      )}
    </span>
  );
}
