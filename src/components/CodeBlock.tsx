interface CodeBlockProps {
  code: string;
  lang?: string;
  filename?: string;
}

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CodeBlock({ code, lang = "bash", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // simple highlight: comments, strings, keywords
  const lines = code.split("\n");

  return (
    <div className="bg-card border-hairline border-border rounded-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b-hairline border-border bg-surface-tertiary">
        <span className="font-mono text-[11px] text-tertiary">
          {filename ?? lang}
        </span>
        <button
          onClick={onCopy}
          className="inline-flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground hover:text-foreground"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-primary" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <pre className="p-4 sm:p-5 font-mono text-[12.5px] leading-[1.7] overflow-x-auto">
        {lines.map((line, i) => (
          <div
            key={i}
            className={cn(
              line.startsWith("$")
                ? "text-foreground"
                : line.trimStart().startsWith("✓")
                  ? "text-primary"
                  : line.trimStart().startsWith("//") ||
                      line.trimStart().startsWith("#")
                    ? "text-tertiary"
                    : "text-muted-foreground",
            )}
          >
            {line || "\u00A0"}
          </div>
        ))}
      </pre>
    </div>
  );
}
