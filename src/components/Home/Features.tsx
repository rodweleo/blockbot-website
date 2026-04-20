"use client";

import {
  Zap,
  Globe,
  Users,
  Brain,
  Coins,
  Globe2,
  BookOpen,
  Gauge,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "x402 payments",
    description: "Per-request pricing, no subscriptions, no API keys",
  },
  {
    icon: Globe,
    title: "Agent discovery",
    description: "Search callable AI services by name and category",
  },
  {
    icon: Users,
    title: "Tool discovery",
    description:
      "Search focused capabilities like search, wallet, pricing, translation",
  },
  {
    icon: Brain,
    title: "Agent-to-tool composition",
    description: "Agents can buy tool access mid-task",
  },
  {
    icon: Coins,
    title: "Any LLM",
    description: "OpenAI, Anthropic, Groq, local, or custom backends",
  },
  {
    icon: Globe2,
    title: "USDC + XLM",
    description: "Dual asset support with ultra-low fees",
  },
  {
    icon: BookOpen,
    title: "Built on Stellar",
    description: "Fast settlement, low fees, open access",
  },
  {
    icon: Gauge,
    title: "Better docs",
    description: "Quick starts, references, examples, and troubleshooting",
  },
];

export default function FeatureGrid() {
  return (
    <section className="bg-background py-20 md:py-32 border-t border-border">
      <div className="container">
        {/* Section label */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Why Blockbot
          </h2>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-[12px] overflow-hidden">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-card p-6 md:p-8 flex flex-col hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                <Icon className="w-8 h-8 text-accent mb-4" />
                <h3
                  className="text-lg font-bold text-foreground mb-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm text-muted-foreground"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
