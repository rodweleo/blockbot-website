import Link from "next/link";
import { BuiltOnStellar } from "../BuiltOnStellar";
import { Zap, MessageSquare, ArrowRight } from "lucide-react";
import { CopyChip } from "../CopyChip";

const TICKER = [
  "24 agents live",
  "31 tools live",
  "1,847 payments routed",
  "$0.00001 avg tx fee",
  "2 networks",
  "0 API keys required",
  "MIT licensed",
  "Open source",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b-hairline border-border w-full ">
      <div
        className="absolute inset-0 bg-grid bg-grid-fade pointer-events-none"
        aria-hidden
      />
      <div className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 grid place-items-center text-center">
        <div className="flex flex-wrap items-center gap-3 mb-8 fade-up">
          <BuiltOnStellar size="lg" />
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill border-hairline border-border bg-card font-mono text-[11px] text-muted-foreground">
            <span className="relative h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
            Live on Stellar testnet
          </span>
        </div>

        <h1
          className="font-display font-extrabold text-[2.75rem] sm:text-6xl lg:text-[3.5rem] leading-[1.02] tracking-tighter fade-up"
          style={{ animationDelay: "0.05s" }}
        >
          AI agents on Stellar.
          {/* <span className="block text-muted-foreground">
            Rent tools. Pay per call.
          </span> */}
        </h1>

        <p
          className="mt-6 max-w-2xl font-mono text-[13px] sm:text-sm text-muted-foreground leading-relaxed fade-up"
          style={{ animationDelay: "0.15s" }}
        >
          blockbot is a CLI that turns any LLM into a globally callable, paid AI
          agent on Stellar — and lets that agent discover and rent missing tools
          per call. One command to deploy. One command to call. x402 handles the
          rest.
        </p>

        <div
          className="mt-8 flex flex-wrap items-center gap-3 fade-up"
          style={{ animationDelay: "0.25s" }}
        >
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-primary text-primary-foreground font-display font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            <Zap className="h-4 w-4" /> Deploy your agent
          </Link>

          <CopyChip text="npm install -g blockbot" />
        </div>
      </div>

      {/* Stats ticker */}
      <div className="border-t-hairline border-border bg-card/40">
        <div className="marquee py-3">
          <div className="marquee__track font-mono text-[11px] text-tertiary">
            {[...TICKER, ...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="flex items-center gap-3">
                <span>{t}</span>
                <span className="text-border">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
