// Mock data for the demo creator dashboard.
// Demo user owns 'market-analyst' and 'wallet-inspector'.

export interface OwnedAgent {
  name: string;
  status: "running" | "stopped" | "low-balance";
  agentWallet: {
    address: string;
    balanceUsdc: string;
    balanceXlm: string;
    healthStatus: "healthy" | "warning" | "critical";
  };
  earnings: { today: string; thisMonth: string; lifetime: string };
  callsToday: number;
  callsThisMonth: number;
  endpoint: string;
  uptime: number;
  pricePerCall: string;
  asset: "USDC" | "XLM";
  network: "testnet" | "mainnet";
  model: string;
  avgResponseTimeMs: number;
}

export const OWNED_AGENTS: OwnedAgent[] = [
  {
    name: "market-analyst",
    status: "running",
    agentWallet: {
      address: "GBXYZ4PQNXZ8VT5LMECHW3K3MOQAEC43HFGH9KLM2N1Q4WERTYUI123K",
      balanceUsdc: "12.40",
      balanceXlm: "9.85",
      healthStatus: "healthy",
    },
    earnings: { today: "4.20", thisMonth: "84.70", lifetime: "84.70" },
    callsToday: 42,
    callsThisMonth: 847,
    endpoint: "https://market-analyst.blockbot.xyz/agent",
    uptime: 99.2,
    pricePerCall: "0.10",
    asset: "USDC",
    network: "testnet",
    model: "llama-3.3-70b-versatile",
    avgResponseTimeMs: 3100,
  },
  {
    name: "wallet-inspector",
    status: "low-balance",
    agentWallet: {
      address: "GBWALLETINSPECTOR4XZQ7RR4PQNXZ8VT5LMECHW3K3MOQAEC43NM12",
      balanceUsdc: "0.85",
      balanceXlm: "2.10",
      healthStatus: "critical",
    },
    earnings: { today: "2.10", thisMonth: "60.20", lifetime: "60.20" },
    callsToday: 18,
    callsThisMonth: 1204,
    endpoint: "https://wallet-inspector.blockbot.xyz/agent",
    uptime: 99.8,
    pricePerCall: "0.05",
    asset: "USDC",
    network: "testnet",
    model: "mixtral-8x7b-32768",
    avgResponseTimeMs: 1800,
  },
];

export const DASHBOARD_SUMMARY = {
  totalAgents: 2,
  totalEarningsLifetime: "144.90",
  totalCallsLifetime: 2051,
  agentsNeedingAttention: 1,
};

// Daily earnings for the last 30 days
export function generateDailySeries(
  seed = 1,
): { date: string; usdc: number; calls: number }[] {
  const out: { date: string; usdc: number; calls: number }[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const noise = Math.sin(i * seed * 0.7) * 0.5 + Math.cos(i * 0.3) * 0.3;
    const calls = Math.max(5, Math.round(35 + noise * 25 + (29 - i) * 0.4));
    out.push({
      date: d.toISOString().slice(5, 10),
      usdc: +(calls * 0.1).toFixed(2),
      calls,
    });
  }
  return out;
}

export const RECENT_AGENT_CALLS = [
  {
    id: "call_1",
    caller: "GAPAHX4TCR3YZP4J6NWKKRHGQQ3WVQAUNZGCBPGF44ZQAVJ43NMTGZLK",
    task: "what is XLM price right now?",
    responseMs: 2900,
    amount: "0.10",
    asset: "USDC",
    status: "success",
    txHash: "abc123def456abc789",
    at: "12:04:11",
  },
  {
    id: "call_2",
    caller: "GBHHJK77NXZ8VT5LMECHW3K3MOQAEC43HQ7RR4PQNXZ8VT5LMECHW3K",
    task: "summarize XLM/USDC orderbook",
    responseMs: 3400,
    amount: "0.10",
    asset: "USDC",
    status: "success",
    txHash: "def456abc789def123",
    at: "12:03:44",
  },
  {
    id: "call_3",
    caller: "GCN3WS9XZQ7RR4PQNXZ8VT5LMECHW3K3MOQAEC43HQ7RR4PQNXZ8VT5",
    task: "is there volume spike today?",
    responseMs: 2750,
    amount: "0.10",
    asset: "USDC",
    status: "success",
    txHash: "789abc123def456789",
    at: "12:02:18",
  },
  {
    id: "call_4",
    caller: "GLMNB22XZ8VT5LMECHW3K3MOQAEC43HQ7RR4PQNXZ8VT5LMECHW3K3M",
    task: "best DEX path for 1000 USDC -> XLM",
    responseMs: 3950,
    amount: "0.10",
    asset: "USDC",
    status: "success",
    txHash: "456def789abc123def",
    at: "12:01:02",
  },
  {
    id: "call_5",
    caller: "GFFEE123MOQAEC43HVT5LMECHW3K3MOQAEC43HQ7RR4PQNXZ8VT5LME",
    task: "explain price drop last 4h",
    responseMs: 3100,
    amount: "0.10",
    asset: "USDC",
    status: "success",
    txHash: "123abc456def789abc",
    at: "11:58:51",
  },
];
