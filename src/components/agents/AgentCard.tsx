import Link from "next/link";
import { Pill } from "@/components/Pill";
import type { Agent } from "@/data/registry";

export function AgentCard({ agent }: { agent: Agent }) {
  const totalTools = agent.toolsBuiltIn.length + agent.toolsRented.length;
  return (
    <Link
      href={`/agents/${agent.name}`}
      className="group block bg-card border-hairline border-border rounded-card p-5 sm:p-6 transition-colors hover:border-primary"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <span className="grid place-items-center h-9 w-9 rounded-md bg-surface-tertiary border-hairline border-border text-base">
            {agent.icon}
          </span>
          <div>
            <h3 className="font-display font-bold text-base leading-tight">
              {agent.name}
            </h3>
            <div className="mt-1 inline-flex items-center gap-1.5">
              <span className="relative h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
              <span className="font-mono text-[10px] text-primary">live</span>
            </div>
          </div>
        </div>
      </div>

      <p className="font-mono text-[12px] text-muted-foreground line-clamp-2 leading-relaxed mb-4">
        {agent.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        <Pill variant="type">{agent.type}</Pill>
        <Pill variant="price">
          {agent.pricePerCall} {agent.asset}
        </Pill>
        <Pill variant="network">{agent.network}</Pill>
        <Pill variant="tool">uses {totalTools} tools</Pill>
      </div>

      <div className="font-mono text-[10px] text-tertiary truncate">
        {agent.endpoint}
      </div>
    </Link>
  );
}
