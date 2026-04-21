"use client";

import { FLAT_PAGES } from "@/data/docs";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";

export default function CommandK({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const navigate = useRouter();
  const results = useMemo(() => {
    if (!q) return FLAT_PAGES;
    const lower = q.toLowerCase();
    return FLAT_PAGES.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.section.toLowerCase().includes(lower) ||
        p.slug.includes(lower),
    );
  }, [q]);

  useEffect(() => {
    if (open) setQ("");
  }, [open]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-start pt-24 bg-background/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="container max-w-xl" onClick={(e) => e.stopPropagation()}>
        <div className="bg-card border-hairline border-border rounded-card overflow-hidden shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-3 border-b-hairline border-border">
            <Search className="h-4 w-4 text-tertiary" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="search docs..."
              className="flex-1 bg-transparent font-mono text-sm placeholder:text-tertiary outline-none"
            />
            <kbd className="font-mono text-[10px] text-tertiary border-hairline border-border rounded px-1.5 py-0.5">
              esc
            </kbd>
          </div>
          <ul className="max-h-80 overflow-y-auto scrollbar-thin py-1">
            {results.length === 0 && (
              <li className="px-4 py-6 font-mono text-xs text-muted-foreground text-center">
                No matches.
              </li>
            )}
            {results.slice(0, 20).map((p) => (
              <li key={p.slug}>
                <button
                  onClick={() => {
                    navigate.push(`/docs/${p.slug}`);
                    onClose();
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-surface-tertiary flex items-center justify-between gap-3"
                >
                  <span className="font-mono text-sm text-foreground">
                    {p.title}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-ui text-tertiary">
                    {p.section}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
