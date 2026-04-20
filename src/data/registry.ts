// Mock data for the blockbot registry preview UI.
// Realistic, no Lorem ipsum.

export type Network = "testnet" | "mainnet";
export type Asset = "USDC" | "XLM";

export interface Agent {
  name: string;
  icon: string;
  description: string;
  type: string; // agent | data | proxy
  network: Network;
  asset: Asset;
  pricePerCall: string; // e.g. "0.10"
  endpoint: string;
  owner: string;
  model?: string;
  toolsBuiltIn: string[];
  toolsRented: { name: string; price: string }[];
  registered: string;
  stats: { calls: number; volume: string; uptime: number };
}

export interface Tool {
  name: string;
  icon: string;
  capability: string;
  category:
    | "search"
    | "data"
    | "on-chain"
    | "compute"
    | "vision"
    | "audio"
    | "utility";
  network: Network;
  asset: Asset;
  pricePerCall: string;
  endpoint: string;
  owner: string;
  inputSchema: Record<string, string>;
  outputSchema: Record<string, unknown>;
  registered: string;
  stats: {
    invocations: number;
    volume: string;
    p50ms: number;
    successRate: number;
  };
}

export const AGENTS: Agent[] = [
  {
    name: "market-analyst",
    icon: "📈",
    description:
      "Real-time XLM/USDC price data, Stellar DEX order-book analysis, and market summaries.",
    type: "agent",
    network: "testnet",
    asset: "USDC",
    pricePerCall: "0.10",
    endpoint: "https://market-analyst.ngrok.io/agent",
    owner: "GA7RR4PQNXZ8VT5LMECHW3K3MOQAEC43H",
    model: "llama-3.3-70b-versatile",
    toolsBuiltIn: ["web_search", "get_crypto_price"],
    toolsRented: [
      { name: "tw-search", price: "0.02" },
      { name: "onchain-read", price: "0.01" },
    ],
    registered: "2026-04-16",
    stats: { calls: 847, volume: "84.70", uptime: 99.2 },
  },
  {
    name: "wallet-inspector",
    icon: "💼",
    description:
      "Query any Stellar account: balances, trustlines, transactions, and operations.",
    type: "data",
    network: "testnet",
    asset: "USDC",
    pricePerCall: "0.05",
    endpoint: "https://wallet-inspector.ngrok.io/agent",
    owner: "GBWALLETINSPECTOR4XZQ7RR4PQNXZ8VT",
    model: "groq mixtral-8x7b",
    toolsBuiltIn: ["horizon_query"],
    toolsRented: [{ name: "onchain-read", price: "0.01" }],
    registered: "2026-04-12",
    stats: { calls: 1204, volume: "60.20", uptime: 99.8 },
  },
  {
    name: "defi-router",
    icon: "🔀",
    description:
      "Optimal swap paths on Stellar DEX with slippage and price-impact estimates.",
    type: "agent",
    network: "mainnet",
    asset: "USDC",
    pricePerCall: "0.25",
    endpoint: "https://defi-router.fly.dev/agent",
    owner: "GDDEFIROUTER1EC43HVT5LMECHW3K3MOQ",
    model: "openai gpt-4o-mini",
    toolsBuiltIn: ["dex_paths", "slippage_calc"],
    toolsRented: [
      { name: "price-feed", price: "0.01" },
      { name: "onchain-read", price: "0.01" },
    ],
    registered: "2026-04-08",
    stats: { calls: 312, volume: "78.00", uptime: 98.4 },
  },
  {
    name: "crypto-news",
    icon: "📰",
    description:
      "Stellar ecosystem news + protocol announcements with RAG over the SDF blog.",
    type: "data",
    network: "testnet",
    asset: "USDC",
    pricePerCall: "0.02",
    endpoint: "https://crypto-news.ngrok.io/agent",
    owner: "GCN3WS9XZQ7RR4PQNXZ8VT5LMECHW3K3",
    model: "groq llama-3.1-8b",
    toolsBuiltIn: ["rss_fetch"],
    toolsRented: [
      { name: "tw-search", price: "0.02" },
      { name: "web-fetch", price: "0.01" },
    ],
    registered: "2026-04-14",
    stats: { calls: 2104, volume: "42.08", uptime: 99.9 },
  },
  {
    name: "anchor-proxy",
    icon: "🔌",
    description:
      "Proxy to Stellar anchors implementing SEP-6 / SEP-24 deposit and withdrawal.",
    type: "proxy",
    network: "mainnet",
    asset: "USDC",
    pricePerCall: "0.15",
    endpoint: "https://anchor-proxy.fly.dev/agent",
    owner: "GANCHRPRXY8VT5LMECHW3K3MOQAEC43H",
    model: "anthropic claude-3-haiku",
    toolsBuiltIn: ["sep_client"],
    toolsRented: [{ name: "geocode", price: "0.005" }],
    registered: "2026-04-02",
    stats: { calls: 187, volume: "28.05", uptime: 97.6 },
  },
  {
    name: "tx-analyzer",
    icon: "🧮",
    description:
      "Decode and explain any Stellar transaction by hash, with operation breakdown.",
    type: "data",
    network: "testnet",
    asset: "USDC",
    pricePerCall: "0.08",
    endpoint: "https://tx-analyzer.ngrok.io/agent",
    owner: "GTXAN4LYZRMOQAEC43HVT5LMECHW3K3M",
    model: "groq llama-3.3-70b",
    toolsBuiltIn: ["xdr_decode"],
    toolsRented: [{ name: "onchain-read", price: "0.01" }],
    registered: "2026-04-10",
    stats: { calls: 521, volume: "41.68", uptime: 99.4 },
  },
];

export const TOOLS: Tool[] = [
  {
    name: "tw-search",
    icon: "🔎",
    capability: "Search recent public tweets and return ranked results.",
    category: "search",
    network: "testnet",
    asset: "USDC",
    pricePerCall: "0.02",
    endpoint: "https://tw-search.ngrok.io/tool",
    owner: "GTOOLTWSRCHQ7RR4PQNXZ8VT5LMECHW3",
    inputSchema: {
      query: "string",
      limit: "number?  (default 10, max 50)",
      lang: "string?  (e.g. 'en')",
    },
    outputSchema: {
      results: [
        {
          id: "string",
          author: "string",
          text: "string",
          likes: "number",
          retweets: "number",
          createdAt: "string (ISO8601)",
        },
      ],
    },
    registered: "2026-04-12",
    stats: { invocations: 412, volume: "8.24", p50ms: 380, successRate: 0.992 },
  },
  {
    name: "web-fetch",
    icon: "🌐",
    capability: "Fetch + clean any public URL to markdown.",
    category: "search",
    network: "testnet",
    asset: "USDC",
    pricePerCall: "0.01",
    endpoint: "https://web-fetch.ngrok.io/tool",
    owner: "GWFETCH8VT5LMECHW3K3MOQAEC43HQ7R",
    inputSchema: { url: "string", selector: "string?" },
    outputSchema: { markdown: "string", title: "string", wordCount: "number" },
    registered: "2026-04-09",
    stats: {
      invocations: 1083,
      volume: "10.83",
      p50ms: 540,
      successRate: 0.987,
    },
  },
  {
    name: "onchain-read",
    icon: "🔗",
    capability:
      "Read any Stellar account, asset, or ledger entry from Horizon.",
    category: "on-chain",
    network: "mainnet",
    asset: "USDC",
    pricePerCall: "0.01",
    endpoint: "https://onchain-read.fly.dev/tool",
    owner: "GONCHRDRMOQAEC43HVT5LMECHW3K3PQN",
    inputSchema: {
      account: "string?",
      assetCode: "string?",
      ledger: "number?",
    },
    outputSchema: { data: "object" },
    registered: "2026-04-04",
    stats: {
      invocations: 2840,
      volume: "28.40",
      p50ms: 120,
      successRate: 0.999,
    },
  },
  {
    name: "ocr-extract",
    icon: "📷",
    capability: "Extract text from any image URL via OCR.",
    category: "vision",
    network: "testnet",
    asset: "USDC",
    pricePerCall: "0.03",
    endpoint: "https://ocr-extract.ngrok.io/tool",
    owner: "GOCRXTRCT4PQNXZ8VT5LMECHW3K3MOQA",
    inputSchema: { imageUrl: "string", lang: "string?" },
    outputSchema: { text: "string", blocks: "Block[]", confidence: "number" },
    registered: "2026-04-15",
    stats: { invocations: 89, volume: "2.67", p50ms: 1820, successRate: 0.945 },
  },
  {
    name: "geocode",
    icon: "🗺",
    capability: "Address ↔ coordinates lookup.",
    category: "utility",
    network: "testnet",
    asset: "USDC",
    pricePerCall: "0.005",
    endpoint: "https://geocode.ngrok.io/tool",
    owner: "GGEOCDEMOQAEC43HVT5LMECHW3K3PQNX",
    inputSchema: { query: "string" },
    outputSchema: { lat: "number", lon: "number", display: "string" },
    registered: "2026-04-11",
    stats: { invocations: 318, volume: "1.59", p50ms: 220, successRate: 0.998 },
  },
  {
    name: "transcribe",
    icon: "🔊",
    capability: "Speech-to-text from an audio URL.",
    category: "audio",
    network: "mainnet",
    asset: "USDC",
    pricePerCall: "0.05",
    endpoint: "https://transcribe.fly.dev/tool",
    owner: "GTRNSCRBE4PQNXZ8VT5LMECHW3K3MOQA",
    inputSchema: { audioUrl: "string", lang: "string?" },
    outputSchema: { text: "string", segments: "Segment[]" },
    registered: "2026-04-06",
    stats: { invocations: 64, volume: "3.20", p50ms: 4200, successRate: 0.968 },
  },
  {
    name: "sum-stats",
    icon: "🧮",
    capability: "Aggregate stats over a JSON array (mean, median, p95, etc).",
    category: "compute",
    network: "testnet",
    asset: "USDC",
    pricePerCall: "0.005",
    endpoint: "https://sum-stats.ngrok.io/tool",
    owner: "GSUMSTATS8VT5LMECHW3K3MOQAEC43HQ",
    inputSchema: { data: "number[]", percentiles: "number[]?" },
    outputSchema: { mean: "number", median: "number", p95: "number" },
    registered: "2026-04-13",
    stats: { invocations: 502, volume: "2.51", p50ms: 90, successRate: 1.0 },
  },
  {
    name: "price-feed",
    icon: "📡",
    capability: "Cross-exchange spot price for a symbol.",
    category: "data",
    network: "mainnet",
    asset: "USDC",
    pricePerCall: "0.01",
    endpoint: "https://price-feed.fly.dev/tool",
    owner: "GPRCFD8VT5LMECHW3K3MOQAEC43HQ7RR",
    inputSchema: { symbol: "string", venues: "string[]?" },
    outputSchema: {
      mid: "number",
      bid: "number",
      ask: "number",
      source: "string",
    },
    registered: "2026-04-07",
    stats: {
      invocations: 1604,
      volume: "16.04",
      p50ms: 180,
      successRate: 0.997,
    },
  },
];

export function getAgent(name: string) {
  return AGENTS.find((a) => a.name === name);
}
export function getTool(name: string) {
  return TOOLS.find((t) => t.name === name);
}

export const STATS = {
  totalAgents: 24,
  totalTools: 31,
  totalPayments: 1847,
  totalVolumeUsdc: "184.70",
  avgFeeUsd: "0.00001",
  testnet: { agents: 18, tools: 22, payments: 1204 },
  mainnet: { agents: 6, tools: 9, payments: 643 },
};

export const RECENT_PAYMENTS = [
  {
    time: "12:04:11",
    from: "GABCD1XYZ8VT5LMECHW3",
    to: "market-analyst",
    kind: "agent" as const,
    amount: "0.10",
    status: "settled",
  },
  {
    time: "12:04:09",
    from: "market-analyst",
    to: "tw-search",
    kind: "tool" as const,
    amount: "0.02",
    status: "settled",
  },
  {
    time: "12:03:58",
    from: "GFFEE123MOQAEC43HVT5L",
    to: "defi-router",
    kind: "agent" as const,
    amount: "0.25",
    status: "settled",
  },
  {
    time: "12:03:42",
    from: "crypto-news",
    to: "tw-search",
    kind: "tool" as const,
    amount: "0.02",
    status: "settled",
  },
  {
    time: "12:03:21",
    from: "GHHJK77NXZ8VT5LMECHW3",
    to: "wallet-inspector",
    kind: "agent" as const,
    amount: "0.05",
    status: "settled",
  },
  {
    time: "12:03:08",
    from: "wallet-inspector",
    to: "onchain-read",
    kind: "tool" as const,
    amount: "0.01",
    status: "settled",
  },
  {
    time: "12:02:55",
    from: "GLMNB22XZ8VT5LMECHW3K3",
    to: "tx-analyzer",
    kind: "agent" as const,
    amount: "0.08",
    status: "settled",
  },
  {
    time: "12:02:41",
    from: "defi-router",
    to: "price-feed",
    kind: "tool" as const,
    amount: "0.01",
    status: "settled",
  },
];
