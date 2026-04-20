"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Activity } from "lucide-react";
import { StatCard } from "@/components/stats/StatCard";

const mockStats = {
  totalAgents: 24,
  totalTools: 61,
  totalPayments: 1847,
  totalVolume: 184.7,
  avgFee: 0.00001,
};

const mockTopAgents = [
  {
    rank: 1,
    name: "market-analyst",
    type: "agent",
    network: "testnet",
    calls: 847,
    volume: "84.70 USDC",
  },
  {
    rank: 2,
    name: "wallet-inspector",
    type: "agent",
    network: "testnet",
    calls: 623,
    volume: "31.15 USDC",
  },
  {
    rank: 3,
    name: "defi-router",
    type: "agent",
    network: "mainnet",
    calls: 412,
    volume: "103.00 USDC",
  },
  {
    rank: 4,
    name: "crypto-news",
    type: "data",
    network: "testnet",
    calls: 298,
    volume: "5.96 USDC",
  },
  {
    rank: 5,
    name: "tx-analyzer",
    type: "agent",
    network: "testnet",
    calls: 187,
    volume: "14.96 USDC",
  },
];

const mockTopTools = [
  {
    rank: 1,
    name: "stellar-search",
    capability: "search",
    network: "testnet",
    uses: 1203,
    volume: "24.06 USDC",
  },
  {
    rank: 2,
    name: "wallet-lookup",
    capability: "wallet",
    network: "testnet",
    uses: 892,
    volume: "8.92 USDC",
  },
  {
    rank: 3,
    name: "dex-price-feed",
    capability: "pricing",
    network: "mainnet",
    uses: 654,
    volume: "19.62 USDC",
  },
  {
    rank: 4,
    name: "doc-summarizer",
    capability: "summarization",
    network: "testnet",
    uses: 421,
    volume: "16.84 USDC",
  },
  {
    rank: 5,
    name: "translate-lite",
    capability: "translation",
    network: "testnet",
    uses: 312,
    volume: "3.12 USDC",
  },
];

const mockRecentPayments = [
  {
    timestamp: "2 min ago",
    from: "GA7RR...EC43H",
    to: "market-analyst",
    amount: "0.10 USDC",
    status: "settled",
  },
  {
    timestamp: "5 min ago",
    from: "GABCD...XYZ",
    to: "wallet-inspector",
    amount: "0.05 USDC",
    status: "settled",
  },
  {
    timestamp: "8 min ago",
    from: "GDEF1...ABC2",
    to: "defi-router",
    amount: "0.25 USDC",
    status: "settled",
  },
  {
    timestamp: "12 min ago",
    from: "GA7RR...EC43H",
    to: "stellar-search",
    amount: "0.02 USDC",
    status: "settled",
  },
  {
    timestamp: "15 min ago",
    from: "GHIJ2...DEF3",
    to: "crypto-news",
    amount: "0.02 USDC",
    status: "settled",
  },
];

export default function Stats() {
  const [displayedStats, setDisplayedStats] = useState(mockStats);

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      setDisplayedStats((prev) => ({
        ...prev,
        totalPayments: prev.totalPayments + Math.floor(Math.random() * 5),
        totalVolume: parseFloat(
          (prev.totalVolume + Math.random() * 0.5).toFixed(2),
        ),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-12 md:py-20">
        {/* Page header */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1
              className="text-5xl md:text-6xl font-bold text-foreground mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Marketplace Stats
            </h1>
            <p
              className="text-base text-muted-foreground"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Live data · updates every 30 seconds
            </p>
          </div>
          <div className="status-pulse" />
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          <StatCard
            label="Total Agents"
            value={displayedStats.totalAgents}
            icon={TrendingUp}
          />
          <StatCard
            label="Total Tools"
            value={displayedStats.totalTools}
            icon={TrendingUp}
          />
          <StatCard
            label="Total Payments"
            value={displayedStats.totalPayments}
            icon={Activity}
          />
          <StatCard
            label="Total Volume"
            value={`$${displayedStats.totalVolume}`}
            icon={TrendingUp}
          />
          <StatCard
            label="Avg Fee"
            value={`$${displayedStats.avgFee}`}
            icon={TrendingUp}
          />
        </div>

        {/* Top agents */}
        <div className="mb-12">
          <h2
            className="text-2xl md:text-3xl font-bold text-foreground mb-6"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Top agents by calls
          </h2>
          <div className="bg-card border border-border rounded-[12px] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th
                      className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      Rank
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      Agent
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      Network
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      Calls
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      Volume
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockTopAgents.map((agent) => (
                    <tr
                      key={agent.rank}
                      className="border-b border-border hover:bg-secondary/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-foreground font-bold">
                        {agent.rank}
                      </td>
                      <td className="px-6 py-4 text-foreground">
                        {agent.name}
                      </td>
                      <td className="px-6 py-4">
                        <span className="network-badge">{agent.network}</span>
                      </td>
                      <td className="px-6 py-4 text-foreground">
                        {agent.calls}
                      </td>
                      <td className="px-6 py-4 text-accent">{agent.volume}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top tools */}
        <div className="mb-12">
          <h2
            className="text-2xl md:text-3xl font-bold text-foreground mb-6"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Top tools by usage
          </h2>
          <div className="bg-card border border-border rounded-[12px] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th
                      className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      Rank
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      Tool
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      Capability
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      Uses
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      Volume
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockTopTools.map((tool) => (
                    <tr
                      key={tool.rank}
                      className="border-b border-border hover:bg-secondary/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-foreground font-bold">
                        {tool.rank}
                      </td>
                      <td className="px-6 py-4 text-foreground">{tool.name}</td>
                      <td className="px-6 py-4">
                        <span className="type-tag">{tool.capability}</span>
                      </td>
                      <td className="px-6 py-4 text-foreground">{tool.uses}</td>
                      <td className="px-6 py-4 text-accent">{tool.volume}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent payments */}
        <div>
          <h2
            className="text-2xl md:text-3xl font-bold text-foreground mb-6"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Recent payments
          </h2>
          <div className="space-y-2">
            {mockRecentPayments.map((payment, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-[6px] p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
              >
                <div className="flex-1">
                  <p
                    className="text-xs text-muted-foreground mb-1"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {payment.timestamp}
                  </p>
                  <p
                    className="text-sm text-foreground"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {payment.from} → {payment.to}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-accent">
                    {payment.amount}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ✓ {payment.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
