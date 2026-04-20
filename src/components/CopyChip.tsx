"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyChipProps {
  text: string;
  full?: boolean;
  variant?: "primary" | "ghost";
  className?: string;
}

export function CopyChip({
  text,
  full,
  variant = "primary",
  className,
}: CopyChipProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* noop */
    }
  };

  return (
    <button
      onClick={onCopy}
      className={cn(
        "group inline-flex items-center gap-2 px-3 py-1.5 rounded-md font-mono text-xs",
        "border-hairline transition-colors",
        variant === "primary"
          ? "bg-primary/10 border-primary/40 text-primary hover:bg-primary/15 hover:border-primary"
          : "bg-surface-tertiary border-border text-foreground hover:border-primary/60",
        full && "w-full justify-between",
        className,
      )}
      aria-label={`Copy: ${text}`}
    >
      <span className="truncate">
        <span className="text-muted-foreground">$ </span>
        {text}
      </span>
      {copied ? (
        <Check className="h-3.5 w-3.5 text-primary shrink-0" />
      ) : (
        <Copy className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100 shrink-0" />
      )}
    </button>
  );
}
