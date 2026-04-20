"use client";
import { useState, useMemo } from "react";
import {
  ArrowLeft,
  ArrowDownToLine,
  ArrowUpFromLine,
  Copy,
  Check,
  Power,
  Trash2,
  RefreshCw,
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useWallet } from "@/contexts/WalletContext";
import {
  OWNED_AGENTS,
  RECENT_AGENT_CALLS,
  generateDailySeries,
} from "@/data/dashboard";
import { SectionLabel } from "@/components/SectionLabel";
import { truncateAddress } from "@/lib/format";
import { cn } from "@/lib/utils";
import { FundModal } from "@/components/agents/FundModal";
import { WithdrawModal } from "@/components/agents/WithdrawModal";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function DashboardAgentDetail() {
  const { agentId } = useParams();
  const wallet = useWallet();
  const agent = OWNED_AGENTS.find((a) => a.name === agentId);
  const [chartMode, setChartMode] = useState<"usdc" | "calls">("usdc");
  const [fundOpen, setFundOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const series = useMemo(
    () => generateDailySeries(agentId === "wallet-inspector" ? 1.4 : 1),
    [name],
  );

  //   if (!wallet.connected) return <Navigate to="/" replace />;
  if (!agent) {
    return (
      <div className="container py-20 text-center">
        <p className="font-mono text-sm text-muted-foreground">
          Agent not found in your dashboard.
        </p>
        <Link
          href="/dashboard"
          className="mt-4 inline-block font-mono text-sm text-primary hover:underline"
        >
          ← back to dashboard
        </Link>
      </div>
    );
  }

  function copyEndpoint() {
    navigator.clipboard.writeText(agent!.endpoint);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="container mx-auto py-12">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 font-mono text-[12px] text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> all agents
      </Link>

      {/* Header */}
      <header className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span
              className={cn(
                "relative h-2 w-2 rounded-full",
                agent.status === "running" && "bg-primary pulse-dot",
                agent.status === "stopped" && "bg-destructive",
                agent.status === "low-balance" && "bg-warning",
              )}
            />
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tighter">
              {agent.name}
            </h1>
            <span className="font-mono text-[11px] text-tertiary">
              uptime {agent.uptime}%
            </span>
          </div>
          <button
            onClick={copyEndpoint}
            className="inline-flex items-center gap-1.5 font-mono text-[12px] text-muted-foreground hover:text-foreground"
          >
            {agent.endpoint}
            {copied ? (
              <Check className="h-3 w-3 text-primary" />
            ) : (
              <Copy className="h-3 w-3 opacity-60" />
            )}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border-hairline border-border text-foreground font-display text-[12px] hover:border-primary">
            <RefreshCw className="h-3.5 w-3.5" /> Restart
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border-hairline border-border text-muted-foreground font-display text-[12px] hover:text-foreground">
            <Power className="h-3.5 w-3.5" /> Stop
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border-hairline border-destructive/40 text-destructive font-display text-[12px] hover:bg-destructive/10">
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </button>
        </div>
      </header>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-card overflow-hidden border-hairline border-border mb-8">
        <div className="bg-card p-5">
          <div className="font-mono text-[10px] uppercase tracking-ui text-tertiary mb-2">
            wallet balance
          </div>
          <div className="font-display font-extrabold text-2xl text-foreground tabular-nums">
            {agent.agentWallet.balanceUsdc}{" "}
            <span className="text-base font-mono text-muted-foreground">
              USDC
            </span>
          </div>
          <button
            onClick={() => setFundOpen(true)}
            className="mt-2 inline-flex items-center gap-1 font-mono text-[11px] text-primary hover:underline"
          >
            <ArrowDownToLine className="h-3 w-3" /> fund
          </button>
        </div>
        <div className="bg-card p-5">
          <div className="font-mono text-[10px] uppercase tracking-ui text-tertiary mb-2">
            total earnings
          </div>
          <div className="font-display font-extrabold text-2xl text-warning tabular-nums">
            ${agent.earnings.lifetime}
          </div>
          <button
            onClick={() => setWithdrawOpen(true)}
            className="mt-2 inline-flex items-center gap-1 font-mono text-[11px] text-warning hover:underline"
          >
            <ArrowUpFromLine className="h-3 w-3" /> withdraw
          </button>
        </div>
        <div className="bg-card p-5">
          <div className="font-mono text-[10px] uppercase tracking-ui text-tertiary mb-2">
            calls
          </div>
          <div className="font-display font-extrabold text-2xl text-foreground tabular-nums">
            {agent.callsToday}
          </div>
          <div className="font-mono text-[11px] text-tertiary mt-1">
            today · {agent.callsThisMonth} this month
          </div>
        </div>
        <div className="bg-card p-5">
          <div className="font-mono text-[10px] uppercase tracking-ui text-tertiary mb-2">
            avg response
          </div>
          <div className="font-display font-extrabold text-2xl text-foreground tabular-nums">
            {agent.avgResponseTimeMs}
            <span className="text-base font-mono text-muted-foreground">
              ms
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <section className="bg-card border-hairline border-border rounded-card p-5 sm:p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <SectionLabel>// last 30 days</SectionLabel>
          <div className="flex gap-1">
            <button
              onClick={() => setChartMode("usdc")}
              className={cn(
                "px-2.5 py-1 rounded-md font-mono text-[11px]",
                chartMode === "usdc"
                  ? "bg-warning/15 text-warning"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              USDC
            </button>
            <button
              onClick={() => setChartMode("calls")}
              className={cn(
                "px-2.5 py-1 rounded-md font-mono text-[11px]",
                chartMode === "calls"
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              calls
            </button>
          </div>
        </div>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={series}
              margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid
                stroke="hsl(var(--border))"
                strokeOpacity={0.4}
                vertical={false}
              />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground-dim))"
                tick={{ fontFamily: "DM Mono", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground-dim))"
                tick={{ fontFamily: "DM Mono", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                width={40}
              />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "0.5px solid hsl(var(--border))",
                  borderRadius: 6,
                  fontFamily: "DM Mono",
                  fontSize: 11,
                }}
                labelStyle={{ color: "hsl(var(--muted-foreground))" }}
              />
              <Line
                type="monotone"
                dataKey={chartMode}
                stroke={
                  chartMode === "usdc"
                    ? "hsl(var(--warning))"
                    : "hsl(var(--primary))"
                }
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Recent calls */}
      <section className="mb-8">
        <SectionLabel>// recent calls</SectionLabel>
        <div className="bg-card border-hairline border-border rounded-card overflow-hidden">
          <div className="grid grid-cols-[auto,1fr,auto,auto,auto] gap-3 px-4 py-3 border-b-hairline border-border font-mono text-[10px] uppercase tracking-ui text-tertiary">
            <span>time</span>
            <span>caller / task</span>
            <span>response</span>
            <span>paid</span>
            <span>tx</span>
          </div>
          {RECENT_AGENT_CALLS.map((c) => (
            <div
              key={c.id}
              className="grid grid-cols-[auto,1fr,auto,auto,auto] gap-3 px-4 py-3 border-b-hairline border-border/50 last:border-b-0 items-center font-mono text-[12px]"
            >
              <span className="text-tertiary">{c.at}</span>
              <div className="min-w-0">
                <div className="text-foreground truncate">{c.task}</div>
                <div className="text-tertiary text-[11px]">
                  {truncateAddress(c.caller)}
                </div>
              </div>
              <span className="text-muted-foreground">{c.responseMs}ms</span>
              <span className="text-warning">
                {c.amount} {c.asset}
              </span>
              <span className="text-tertiary text-[11px]">
                {c.txHash.slice(0, 8)}...
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Config */}
      <section className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card border-hairline border-border rounded-card p-5">
          <div className="flex items-center justify-between mb-4">
            <SectionLabel>// config</SectionLabel>
            <button className="font-mono text-[11px] text-primary hover:underline">
              edit →
            </button>
          </div>
          <dl className="font-mono text-[12px] space-y-2">
            <Row k="price" v={`${agent.pricePerCall} ${agent.asset}`} />
            <Row k="network" v={agent.network} />
            <Row k="model" v={agent.model} />
            <Row k="wallet" v={truncateAddress(agent.agentWallet.address)} />
          </dl>
        </div>
        <div className="bg-card border-hairline border-border rounded-card p-5">
          <SectionLabel>// danger zone</SectionLabel>
          <p className="font-mono text-[12px] text-muted-foreground mb-3">
            Stopping an agent halts all incoming calls. Deletion is permanent
            and refunds the wallet balance to your owner address.
          </p>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border-hairline border-border text-foreground font-display text-[12px]">
              <Power className="h-3.5 w-3.5" /> Stop agent
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border-hairline border-destructive/40 text-destructive font-display text-[12px]">
              <Trash2 className="h-3.5 w-3.5" /> Delete & refund
            </button>
          </div>
        </div>
      </section>

      {fundOpen && (
        <FundModal agent={agent} onClose={() => setFundOpen(false)} />
      )}
      {withdrawOpen && (
        <WithdrawModal agent={agent} onClose={() => setWithdrawOpen(false)} />
      )}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b-hairline border-border/60 py-1.5">
      <span className="text-tertiary">{k}</span>
      <span className="text-foreground">{v}</span>
    </div>
  );
}
