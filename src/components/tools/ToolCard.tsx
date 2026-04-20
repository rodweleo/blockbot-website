import Link from "next/link";
import { Pill } from "@/components/Pill";
import type { Tool } from "@/data/registry";

function formatSchema(s: Record<string, unknown>) {
  const keys = Object.keys(s);
  return `{ ${keys.slice(0, 3).join(", ")}${keys.length > 3 ? ", …" : ""} }`;
}

export function ToolCard({ tool }: { tool: Tool }) {
  const inStr = formatSchema(tool.inputSchema);
  const outKey = Array.isArray(
    (tool.outputSchema as { results?: unknown }).results,
  )
    ? "{ results: Result[] }"
    : formatSchema(tool.outputSchema as Record<string, unknown>);

  return (
    <Link
      href={`/tools/${tool.name}`}
      className="group block bg-card border-hairline border-border rounded-card p-5 sm:p-6 transition-colors hover:border-primary"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <span className="grid place-items-center h-9 w-9 rounded-md bg-surface-tertiary border-hairline border-border text-base">
            {tool.icon}
          </span>
          <div>
            <h3 className="font-display font-bold text-base leading-tight">
              {tool.name}
            </h3>
            <div className="mt-1 inline-flex items-center gap-1.5">
              <span className="relative h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
              <span className="font-mono text-[10px] text-primary">live</span>
            </div>
          </div>
        </div>
        <Pill variant="tool">tool</Pill>
      </div>

      <p className="font-mono text-[12px] text-muted-foreground line-clamp-2 leading-relaxed mb-4">
        {tool.capability}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        <Pill variant="tool">{tool.category}</Pill>
        <Pill variant="price">
          {tool.pricePerCall} {tool.asset} / call
        </Pill>
        <Pill variant="network">{tool.network}</Pill>
      </div>

      <div className="font-mono text-[10px] text-tertiary truncate">
        in: {inStr} → out: {outKey}
      </div>
    </Link>
  );
}
