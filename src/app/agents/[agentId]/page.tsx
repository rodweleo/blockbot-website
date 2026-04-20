"use client";

import { Copy, CheckCircle2, AlertCircle, Zap, Code2 } from "lucide-react";
import { useState } from "react";
const MOCK_AGENT = {
  name: "market-analyst",
  description:
    "Real-time XLM/USDC price data, Stellar DEX analysis, and market summaries for informed trading decisions.",
  price: 0.1,
  asset: "USDC",
  network: "testnet",
  type: "agent",
  status: "live",
  owner: "GAHK7ECS3DAVRUPXC4TOEVEKK260RCVFUGZXVZTIFO5VTJLJAD2XQ4",
  model: "llama-3.3-70b-versatile",
  endpoint: "https://market-analyst.blockbot.xyz/agent",
  totalCalls: 847,
  totalVolume: "$2,341.50",
  uptime: "99.8%",
  avgResponseTime: "1.2s",
  tools: [
    { name: "get_stellar_dex", description: "Real-time DEX trading data" },
    { name: "get_crypto_price", description: "Live cryptocurrency prices" },
    { name: "web_search", description: "Market news and analysis" },
  ],
  examples: [
    "What's the current XLM/USDC price on Stellar DEX?",
    "Show me the best swap path for 1000 USDC to XLM",
    "Analyze recent trading volume trends",
  ],
  recentActivity: [
    { timestamp: "2 min ago", responseTime: "1.1s", status: "success" },
    { timestamp: "5 min ago", responseTime: "1.3s", status: "success" },
    { timestamp: "12 min ago", responseTime: "0.9s", status: "success" },
    { timestamp: "18 min ago", responseTime: "1.4s", status: "success" },
    { timestamp: "25 min ago", responseTime: "1.2s", status: "success" },
  ],
};

export default function AgentDetail() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column: Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-2xl">
                    📈
                  </div>
                  <div>
                    <h1
                      className="text-4xl font-bold text-foreground"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {MOCK_AGENT.name}
                    </h1>
                    <div className="flex gap-2 mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-muted-foreground">
                        {MOCK_AGENT.type}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent">
                        ● Live
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {MOCK_AGENT.description}
                </p>
              </div>

              {/* How to call */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2
                  className="text-xl font-bold text-foreground mb-4"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  How to call
                </h2>
                <div className="space-y-4">
                  {/* CLI */}
                  <div>
                    <p
                      className="text-xs text-muted-foreground uppercase tracking-wider mb-2"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      // CLI
                    </p>
                    <div className="bg-secondary/50 border border-border rounded p-4 relative">
                      <code
                        className="text-sm text-foreground"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        blockbot ask market-analyst "What's the XLM price?"
                      </code>
                      <button
                        onClick={() =>
                          handleCopy(
                            'blockbot ask market-analyst "What\'s the XLM price?"',
                            "cli",
                          )
                        }
                        className="absolute top-2 right-2 p-2 bg-secondary hover:bg-secondary/80 rounded transition-colors"
                      >
                        {copied === "cli" ? (
                          <CheckCircle2 className="w-4 h-4 text-accent" />
                        ) : (
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* curl/fetch */}
                  <div>
                    <p
                      className="text-xs text-muted-foreground uppercase tracking-wider mb-2"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      // curl/fetch
                    </p>
                    <div className="bg-secondary/50 border border-border rounded p-4 relative">
                      <code
                        className="text-sm text-foreground block whitespace-pre-wrap break-words"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {`curl -X POST ${MOCK_AGENT.endpoint} \\
  -H "X-Payment-Signature: <sig>" \\
  -d '{"prompt":"What's the XLM price?"}'`}
                      </code>
                      <button
                        onClick={() =>
                          handleCopy(
                            `curl -X POST ${MOCK_AGENT.endpoint} \\
  -H "X-Payment-Signature: <sig>" \\
  -d '{"prompt":"What's the XLM price?"}'`,
                            "curl",
                          )
                        }
                        className="absolute top-2 right-2 p-2 bg-secondary hover:bg-secondary/80 rounded transition-colors"
                      >
                        {copied === "curl" ? (
                          <CheckCircle2 className="w-4 h-4 text-accent" />
                        ) : (
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Available tools */}
              <div>
                <h2
                  className="text-xl font-bold text-foreground mb-4"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Available tools
                </h2>
                <div className="flex flex-wrap gap-2">
                  {MOCK_AGENT.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="px-3 py-2 bg-secondary border border-border rounded-lg"
                    >
                      <p className="text-sm font-medium text-foreground">
                        {tool.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {tool.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Example tasks */}
              <div>
                <h2
                  className="text-xl font-bold text-foreground mb-4"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Example tasks
                </h2>
                <div className="space-y-3">
                  {MOCK_AGENT.examples.map((example, idx) => (
                    <div
                      key={idx}
                      className="bg-secondary/50 border border-border rounded-lg p-4"
                    >
                      <p className="text-sm text-foreground italic">
                        {example}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent activity */}
              <div>
                <h2
                  className="text-xl font-bold text-foreground mb-4"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Recent activity
                </h2>
                <div className="space-y-2">
                  {MOCK_AGENT.recentActivity.map((activity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-secondary/50 border border-border rounded-lg text-sm"
                    >
                      <span className="text-muted-foreground">
                        {activity.timestamp}
                      </span>
                      <span className="text-foreground">
                        {activity.responseTime}
                      </span>
                      <span className="text-accent">✓</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right sidebar: Sticky card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card border border-border rounded-lg p-6 space-y-6">
                {/* Price */}
                <div>
                  <p
                    className="text-xs text-muted-foreground uppercase tracking-wider mb-2"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    Price per call
                  </p>
                  <p
                    className="text-4xl font-bold text-accent"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    ${MOCK_AGENT.price}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {MOCK_AGENT.asset}
                  </p>
                </div>

                {/* Badges */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-secondary text-muted-foreground">
                      {MOCK_AGENT.type}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-400">
                      {MOCK_AGENT.network}
                    </span>
                  </div>
                </div>

                {/* Owner */}
                <div>
                  <p
                    className="text-xs text-muted-foreground uppercase tracking-wider mb-2"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    Owner
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="text-xs text-foreground font-mono flex-1 truncate">
                      {MOCK_AGENT.owner}
                    </code>
                    <button
                      onClick={() => handleCopy(MOCK_AGENT.owner, "owner")}
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {copied === "owner" ? (
                        <CheckCircle2 className="w-4 h-4 text-accent" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Model */}
                <div>
                  <p
                    className="text-xs text-muted-foreground uppercase tracking-wider mb-2"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    Model
                  </p>
                  <p className="text-sm text-foreground font-mono">
                    {MOCK_AGENT.model}
                  </p>
                </div>

                {/* Stats */}
                <div className="border-t border-border pt-4 space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Total calls
                    </p>
                    <p className="text-lg font-bold text-foreground">
                      {MOCK_AGENT.totalCalls}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Total volume
                    </p>
                    <p className="text-lg font-bold text-accent">
                      {MOCK_AGENT.totalVolume}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Uptime</p>
                    <p className="text-lg font-bold text-foreground">
                      {MOCK_AGENT.uptime}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Avg response time
                    </p>
                    <p className="text-lg font-bold text-foreground">
                      {MOCK_AGENT.avgResponseTime}
                    </p>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="space-y-2 pt-4 border-t border-border">
                  <button className="w-full px-4 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors text-sm flex items-center justify-center gap-2">
                    <Zap className="w-4 h-4" />
                    Call this agent
                  </button>
                  <button className="w-full px-4 py-2 bg-secondary text-foreground border border-border rounded-lg font-semibold hover:border-accent transition-colors text-sm flex items-center justify-center gap-2">
                    <Code2 className="w-4 h-4" />
                    Copy endpoint
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
