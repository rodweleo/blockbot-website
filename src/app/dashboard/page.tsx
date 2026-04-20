"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Copy,
  Check,
  Plus,
  RefreshCw,
  Settings2,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";
import { SectionLabel } from "@/components/SectionLabel";
import { useWallet } from "@/contexts/WalletContext";
import { OWNED_AGENTS, DASHBOARD_SUMMARY } from "@/data/dashboard";
import { truncateAddress } from "@/lib/format";
import { cn } from "@/lib/utils";
import { FundModal } from "@/components/agents/FundModal";
import { WithdrawModal } from "@/components/agents/WithdrawModal";
import { useFreighterAccount } from "@/hooks/useFreighterAccount";

export default function DashboardPage() {
  const { data, isError, isLoading } = useFreighterAccount();
  const wallet = useWallet();
  const [fundFor, setFundFor] = useState<string | null>(null);
  const [withdrawFor, setWithdrawFor] = useState<string | null>(null);
  const [copiedAddr, setCopiedAddr] = useState<string | null>(null);

  function copy(addr: string) {
    navigator.clipboard.writeText(addr);
    setCopiedAddr(addr);
    setTimeout(() => setCopiedAddr(null), 1500);
  }

  return (
    <div className="container mx-auto py-12">
      <header className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <SectionLabel>// creator dashboard</SectionLabel>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tighter">
            Your agents
          </h1>
          <p className="mt-2 font-mono text-sm text-muted-foreground">
            connected as{" "}
            <span className="text-primary">
              {data && !isError && !isLoading && truncateAddress(data.address)}
            </span>
          </p>
        </div>
        <Link
          href="/studio"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-primary text-primary-foreground font-display font-medium text-sm hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" /> Deploy new agent
        </Link>
      </header>

      {/* Metrics */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-card overflow-hidden border-hairline border-border mb-10">
        <Metric
          label="agents deployed"
          value={DASHBOARD_SUMMARY.totalAgents.toString()}
        />
        <Metric
          label="total earnings"
          value={`$${DASHBOARD_SUMMARY.totalEarningsLifetime}`}
          accent="warning"
        />
        <Metric
          label="total calls"
          value={DASHBOARD_SUMMARY.totalCallsLifetime.toLocaleString()}
        />
        <Metric
          label="needs attention"
          value={DASHBOARD_SUMMARY.agentsNeedingAttention.toString()}
          accent={
            DASHBOARD_SUMMARY.agentsNeedingAttention > 0
              ? "destructive"
              : undefined
          }
        />
      </div>

      {/* Agent rows */}
      <SectionLabel>// your deployed agents</SectionLabel>
      <div className="space-y-px bg-border rounded-card overflow-hidden border-hairline border-border">
        {OWNED_AGENTS.map((a) => {
          const balanceNum = parseFloat(a.agentWallet.balanceUsdc);
          const priceNum = parseFloat(a.pricePerCall);
          const ratio = balanceNum / priceNum;
          const healthPct = Math.min(100, (ratio / 30) * 100);
          const healthColor =
            a.agentWallet.healthStatus === "healthy"
              ? "bg-primary"
              : a.agentWallet.healthStatus === "warning"
                ? "bg-warning"
                : "bg-destructive";

          return (
            <div key={a.name} className="bg-card p-5 sm:p-6">
              <div className="grid lg:grid-cols-[auto,1fr,auto] gap-6 items-start">
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "relative h-2 w-2 rounded-full mt-2",
                      a.status === "running" && "bg-primary pulse-dot",
                      a.status === "stopped" && "bg-destructive",
                      a.status === "low-balance" && "bg-warning",
                    )}
                  />
                  <div>
                    <Link
                      href={`/dashboard/agents/${a.name}`}
                      className="font-display font-bold text-lg hover:text-primary"
                    >
                      {a.name}
                    </Link>
                    <div className="mt-1 flex items-center gap-2 font-mono text-[11px] text-tertiary">
                      <button
                        onClick={() => copy(a.agentWallet.address)}
                        className="inline-flex items-center gap-1 hover:text-foreground"
                      >
                        {truncateAddress(a.agentWallet.address)}
                        {copiedAddr === a.agentWallet.address ? (
                          <Check className="h-3 w-3 text-primary" />
                        ) : (
                          <Copy className="h-3 w-3 opacity-60" />
                        )}
                      </button>
                      <span>·</span>
                      <span>{a.network}</span>
                      <span>·</span>
                      <span>uptime {a.uptime}%</span>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-ui text-tertiary mb-1">
                      balance
                    </div>
                    <div className="font-mono text-sm tabular-nums text-foreground">
                      {a.agentWallet.balanceUsdc} USDC
                    </div>
                    <div className="mt-1.5 h-1 bg-surface-tertiary rounded-full overflow-hidden">
                      <div
                        className={cn("h-full transition-all", healthColor)}
                        style={{ width: `${healthPct}%` }}
                      />
                    </div>
                    {a.agentWallet.healthStatus === "critical" && (
                      <div className="mt-1.5 inline-flex items-center gap-1 font-mono text-[10px] text-destructive">
                        <AlertTriangle className="h-3 w-3" /> fund agent now
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-ui text-tertiary mb-1">
                      earned (lifetime)
                    </div>
                    <div className="font-mono text-sm tabular-nums text-warning">
                      ${a.earnings.lifetime}
                    </div>
                    <div className="font-mono text-[11px] text-tertiary mt-1">
                      today: ${a.earnings.today}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-ui text-tertiary mb-1">
                      calls today
                    </div>
                    <div className="font-mono text-sm tabular-nums text-foreground">
                      {a.callsToday}
                    </div>
                    <div className="font-mono text-[11px] text-tertiary mt-1">
                      {a.callsThisMonth} this month
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setFundFor(a.name)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border-hairline border-border text-foreground font-display text-[11px] hover:border-primary"
                  >
                    <ArrowDownToLine className="h-3 w-3" /> Fund
                  </button>
                  <button
                    onClick={() => setWithdrawFor(a.name)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border-hairline border-border text-foreground font-display text-[11px] hover:border-primary"
                  >
                    <ArrowUpFromLine className="h-3 w-3" /> Withdraw
                  </button>
                  <button className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border-hairline border-border text-muted-foreground font-display text-[11px] hover:text-foreground">
                    <RefreshCw className="h-3 w-3" /> Restart
                  </button>
                  <Link
                    href={`/dashboard/agents/${a.name}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border-hairline border-border text-muted-foreground font-display text-[11px] hover:text-foreground"
                  >
                    <Settings2 className="h-3 w-3" /> Manage
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {fundFor && (
        <FundModal
          agent={OWNED_AGENTS.find((a) => a.name === fundFor)!}
          onClose={() => setFundFor(null)}
        />
      )}
      {withdrawFor && (
        <WithdrawModal
          agent={OWNED_AGENTS.find((a) => a.name === withdrawFor)!}
          onClose={() => setWithdrawFor(null)}
        />
      )}
    </div>
  );
}

function Metric({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "warning" | "destructive";
}) {
  return (
    <div className="bg-card p-5">
      <div className="font-mono text-[10px] uppercase tracking-ui text-tertiary mb-2">
        {label}
      </div>
      <div
        className={cn(
          "font-display font-extrabold text-3xl tabular-nums",
          accent === "warning" && "text-warning",
          accent === "destructive" && "text-destructive",
          !accent && "text-foreground",
        )}
      >
        {value}
      </div>
    </div>
  );
}
