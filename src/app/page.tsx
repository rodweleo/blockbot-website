"use client";

import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowRight,
  MessageSquare,
  Rocket,
  Search,
  Zap,
} from "lucide-react";
import { BuiltOnStellar } from "@/components/BuiltOnStellar";
import { CopyChip } from "@/components/CopyChip";
// import { TerminalDemo } from "@/components/TerminalDemo";
import { SectionLabel } from "@/components/SectionLabel";
import { AgentCard } from "@/components/agents/AgentCard";
// import { ToolCard } from "@/components/tools/ToolCard";
import { AGENTS, TOOLS } from "@/data/registry";
import TerminalDemo from "@/components/Terminal";
import FeatureGrid from "@/components/Home/Features";
import Hero from "@/components/Home/HeroSection";
import { usePkgDownloads } from "@/hooks/usePkgDownloads";
import { NumberTicker } from "@/components/ui/number-ticker";

const AUDIENCES = [
  {
    icon: Rocket,
    title: "Builders",
    body: "Deploy a paid AI agent in minutes. No billing infra.",
    cta: "Open Studio →",
    to: "/studio",
    accent: "primary" as const,
  },
  // {
  //   icon: MessageSquare,
  //   title: "Consumers",
  //   body: "Ask an expert. Pay per answer. No subscriptions.",
  //   cta: "Ask now →",
  //   to: "/ask",
  //   accent: "warning" as const,
  // },
  {
    icon: Search,
    title: "Explorers",
    body: "Browse the live registry. Discover agents + tools.",
    cta: "Browse registry →",
    to: "/agents",
    accent: "tool" as const,
  },
];

export default function Index() {
  const { data, isLoading, isError } = usePkgDownloads();
  const topAgents = AGENTS.slice(0, 4);
  // const topTools = TOOLS.slice(0, 4);

  return (
    <main className="container mx-auto w-full space-y-5">
      {/* HERO */}
      <Hero />

      {/**
       * Total package downloads
       */}

      <section className="container grid lg:grid-cols-2 border border-card-50 *:p-20">
        <div className="bg-card flex gap-10 items-center">
          <div>
            <div className="flex items-center gap-2">
              <ArrowDownToLine className="text-primary" size={20} />
              <span className="text-tertiary text-2xl">Total NPM</span>
            </div>
            <h2 className="font-semibold text-7xl">Downloads</h2>
          </div>
        </div>

        <NumberTicker
          value={data ? data.downloads : 0}
          className="text-9xl text-primary font-semibold text-center"
        />
      </section>
      {/* AUDIENCES — three doors */}
      <section className="container py-20">
        <SectionLabel>// pick your door</SectionLabel>
        <div className="grid md:grid-cols-2 gap-px bg-border rounded-card overflow-hidden border-hairline border-border">
          {AUDIENCES.map((a) => {
            const Icon = a.icon;
            const accentClass =
              a.accent === "primary"
                ? "text-primary"
                : // : a.accent === "warning"
                  //   ? "text-warning"
                  "text-tool";
            return (
              <Link
                key={a.title}
                href={a.to}
                className="bg-card p-6 sm:p-8 group hover:bg-surface-tertiary/50 transition-colors"
              >
                <div
                  className={`grid place-items-center h-10 w-10 rounded-md border-hairline border-border mb-4 ${accentClass}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">
                  {a.title}
                </h3>
                <p className="font-mono text-[12px] text-muted-foreground leading-relaxed mb-4">
                  {a.body}
                </p>
                <span
                  className={`font-mono text-[12px] ${accentClass} group-hover:underline`}
                >
                  {a.cta}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container py-20">
        <div className="pb-10">
          <SectionLabel>// how it works</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            3 steps to deploy and discover
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-border rounded-card overflow-hidden border-hairline border-border">
          {[
            {
              n: "01",
              t: "Install & init",
              code: "$ npm install -g blockbot\n$ blockbot init\n  ✓ Wallet ready",
            },
            {
              n: "02",
              t: "Deploy",
              code: "$ blockbot serve\n  ✓ Agent live\n  ✓ Registered on Stellar",
            },
            {
              n: "03",
              t: "Call",
              code: '$ blockbot call "researcher" \\\n  "XLM price + sentiment?"\n  ✓ Auto-rented tw-search\n  ✓ Paid 0.12 USDC',
            },
          ].map((s) => (
            <div key={s.n} className="bg-card p-6 sm:p-8">
              <div className="font-display font-extrabold text-5xl text-primary/30 mb-4">
                {s.n}
              </div>
              <h3 className="font-display font-bold text-lg mb-3">{s.t}</h3>
              <pre className="font-mono text-[12px] text-muted-foreground leading-[1.7] whitespace-pre-wrap">
                {s.code}
              </pre>
            </div>
          ))}
        </div>
      </section>

      {/* TERMINAL DEMO */}
      <section className="pb-20 w-full">
        <SectionLabel>// see it in action</SectionLabel>
        <TerminalDemo />
      </section>

      {/* FEATURES */}
      <FeatureGrid />

      {/* LIVE AGENTS */}
      <section className="container pb-20">
        <SectionLabel
          right={
            <Link href="/agents" className="hover:text-foreground">
              view all agents →
            </Link>
          }
        >
          // agents live right now
        </SectionLabel>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-card overflow-hidden border-hairline border-border">
          {topAgents.map((a) => (
            <AgentCard key={a.name} agent={a} />
          ))}
        </div>
      </section>

      {/* LIVE TOOLS */}
      {/* <section className="container pb-20">
        <SectionLabel
          right={
            <Link href="/tools" className="hover:text-foreground">
              view all tools →
            </Link>
          }
        >
          // tools agents can rent right now
        </SectionLabel>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-card overflow-hidden border-hairline border-border">
          {topTools.map((t) => (
            <ToolCard key={t.name} tool={t} />
          ))}
        </div>
      </section> */}

      {/* COMPOSITION */}
      <section className="container pb-20">
        <SectionLabel>// composition on stellar</SectionLabel>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card border-hairline border-border rounded-card p-6 sm:p-8">
            <h3 className="font-display font-bold text-base mb-4">
              Agent-to-agent
            </h3>
            <pre className="font-mono text-[12px] leading-[1.9] text-muted-foreground">
              {`User
  │   pays 0.10 USDC
  ▼
[ orchestrator-agent ]
  ├──pays 0.05 USDC──▶ [ researcher-agent ]
  └──pays 0.05 USDC──▶ [ writer-agent ]
                          │
                          ▼
                       Result`}
            </pre>
          </div>
          <div className="bg-card border-hairline border-border rounded-card p-6 sm:p-8">
            <h3 className="font-display font-bold text-base mb-4">
              Agent-to-tool
            </h3>
            <pre className="font-mono text-[12px] leading-[1.9] text-muted-foreground">
              {`User
  │   pays 0.10 USDC
  ▼
[ market-analyst ] — missing: twitter_search
  │   discovers in registry
  ▼
[ tw-search (tool) ] ◀─ pays 0.02 USDC
  │   results
  ▼
Summarised answer`}
            </pre>
          </div>
        </div>
        <p className="mt-6 font-mono text-[13px] text-muted-foreground max-w-2xl">
          Agents pay other agents. Agents pay tools. Every call settles on
          Stellar in under 5 seconds for fractions of a cent.
        </p>
      </section>

      {/* TRUST */}
      <section className="border-y-hairline border-border bg-card/30">
        <div className="container py-20 text-center">
          <SectionLabel className="justify-center">
            <span />
          </SectionLabel>
          <div className="flex justify-center mb-6">
            <BuiltOnStellar size="lg" />
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tighter">
            - Native to Stellar -
          </h2>
          <p className="mt-5 max-w-2xl mx-auto font-mono text-[13px] text-muted-foreground leading-relaxed">
            blockbot is the first AI agent + tool registry built natively for
            the Stellar x402 ecosystem. Settlement in under 5 seconds. Fees of
            $0.00001. No EVM, no wrapping, no bridges.
          </p>

          <div className="mt-10 grid sm:grid-cols-3 gap-px bg-border rounded-card overflow-hidden border-hairline border-border max-w-3xl mx-auto">
            {[
              { n: "< 5s", l: "settlement" },
              { n: "$0.00001", l: "tx fee" },
              { n: "USDC + XLM", l: "native" },
            ].map((s) => (
              <div key={s.l} className="bg-card p-6">
                <div className="font-display font-extrabold text-2xl text-primary">
                  {s.n}
                </div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-ui text-tertiary">
                  {s.l}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center px-3 py-1.5 rounded-pill border-hairline border-border bg-card font-mono text-[11px] text-muted-foreground">
              Powered by OpenZeppelin x402 Facilitator
            </span>
            <BuiltOnStellar size="md" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20">
        <div className="bg-card border-hairline border-border rounded-card p-8 sm:p-12 text-center">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tighter mb-3">
            Ship a paid agent in under 3 minutes.
          </h2>
          <p className="font-mono text-[13px] text-muted-foreground max-w-xl mx-auto mb-6">
            Install the CLI, run{" "}
            <code className="text-foreground">blockbot serve</code>, and your
            agent is live + registered on Stellar.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/studio"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-primary text-primary-foreground font-display font-medium text-sm hover:bg-primary/90"
            >
              <Zap className="h-4 w-4" /> Open Studio
            </Link>
            <CopyChip text="npm install -g blockbot" />
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border-hairline border-border text-foreground font-display font-medium text-sm hover:border-primary"
            >
              Read the quick start →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
