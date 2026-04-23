"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Plus, ArrowRight } from "lucide-react";

const mockAgents = [
  {
    id: 1,
    name: "market-analyst",
    emoji: "📈",
    description:
      "Real-time XLM/USDC price data, Stellar DEX analysis, and market summaries",
    price: "0.10",
    network: "testnet",
    type: "agent",
  },
  {
    id: 2,
    name: "wallet-inspector",
    emoji: "💼",
    description:
      "Query any Stellar account balance, trustlines, and transaction history",
    price: "0.05",
    network: "testnet",
    type: "agent",
  },
  {
    id: 3,
    name: "defi-router",
    emoji: "🔀",
    description: "Optimal swap paths on Stellar DEX with slippage estimates",
    price: "0.25",
    network: "mainnet",
    type: "agent",
  },
  {
    id: 4,
    name: "crypto-news",
    emoji: "📰",
    description: "Stellar ecosystem news and protocol announcements via RAG",
    price: "0.02",
    network: "testnet",
    type: "data",
  },
  {
    id: 5,
    name: "anchor-proxy",
    emoji: "🔌",
    description:
      "Proxy to Stellar anchor SEP-6/24 deposit/withdrawal endpoints",
    price: "0.15",
    network: "mainnet",
    type: "proxy",
  },
  {
    id: 6,
    name: "tx-analyzer",
    emoji: "🧮",
    description: "Decode and explain any Stellar transaction by hash",
    price: "0.08",
    network: "testnet",
    type: "agent",
  },
];

export default function Agents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterNetwork, setFilterNetwork] = useState<string | null>(null);

  const filteredAgents = mockAgents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || agent.type === filterType;
    const matchesNetwork = !filterNetwork || agent.network === filterNetwork;
    return matchesSearch && matchesType && matchesNetwork;
  });

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-20">
        {/* Page header */}
        <div className="mb-12">
          <h1
            className="text-5xl md:text-6xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Agent Registry
          </h1>
          <p
            className="text-base text-muted-foreground"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Discover callable agents on Stellar · {mockAgents.length} agents
            live
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-8 space-y-4">
          {/* Search input */}
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name, capability, or use case..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-card border border-border rounded-[6px] pl-12 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              style={{ fontFamily: "'DM Mono', monospace" }}
            />
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setFilterType(null);
                setFilterNetwork(null);
              }}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                !filterType && !filterNetwork
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              All
            </button>
            {["agent", "data", "proxy"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(filterType === type ? null : type)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors capitalize ${
                  filterType === type
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {type}
              </button>
            ))}
            {["testnet", "mainnet"].map((network) => (
              <button
                key={network}
                onClick={() =>
                  setFilterNetwork(filterNetwork === network ? null : network)
                }
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors capitalize ${
                  filterNetwork === network
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {network}
              </button>
            ))}
          </div>
        </div>

        {/* Results info */}
        <div className="mb-6 flex justify-between items-center">
          <p
            className="text-xs text-muted-foreground"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Showing {filteredAgents.length} of {mockAgents.length} agents
          </p>
        </div>

        {/* Agents grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-[12px] overflow-hidden mb-8">
          {filteredAgents.map((agent) => (
            <Link key={agent.id} href={`/agents/${agent.name}`}>
              <div className="bg-card p-6 hover:bg-secondary/50 transition-colors cursor-pointer group">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{agent.emoji}</div>
                  <div className="status-pulse" />
                </div>

                {/* Name */}
                <h3
                  className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {agent.name}
                </h3>

                {/* Description */}
                <p
                  className="text-xs text-muted-foreground mb-4 line-clamp-2"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {agent.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="price-pill">${agent.price}</span>
                  <span className="network-badge">{agent.network}</span>
                  <span className="type-tag">{agent.type}</span>
                </div>

                {/* CTA */}
                <span className="text-xs text-accent hover:text-accent/80 transition-colors flex items-center gap-1 group-hover:gap-2">
                  View details
                  <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}

          {/* Register CTA card */}
          <div className="bg-card border-2 border-dashed border-border p-6 flex flex-col items-center justify-center text-center hover:bg-secondary/50 transition-colors">
            <Plus className="w-8 h-8 text-muted-foreground mb-4" />
            <h3
              className="text-lg font-bold text-foreground mb-2"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Deploy your agent
            </h3>
            <p
              className="text-xs text-muted-foreground mb-4"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Register free and start earning
            </p>
            <a
              href="https://github.com/rodweleo/blockbot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors text-sm font-medium"
            >
              Register free
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
