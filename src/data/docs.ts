export interface DocSection {
  title: string;
  pages: DocPage[];
}

export interface DocPage {
  slug: string;
  title: string;
  content: DocBlock[];
}

export type DocBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "code"; lang: string; code: string; filename?: string }
  | { type: "callout"; kind: "info" | "tip" | "warn"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

export const DOC_SECTIONS: DocSection[] = [
  {
    title: "Getting started",
    pages: [
      {
        slug: "/",
        title: "What is blockbot?",
        content: [
          {
            type: "p",
            text: "blockbot is a CLI + registry that lets any developer deploy an AI agent — or a standalone tool — on the Stellar blockchain in under 3 minutes. Each agent and tool is globally discoverable by name and charges per call in USDC or XLM using the x402 HTTP payment protocol.",
          },
          { type: "h2", text: "Two primitives" },
          {
            type: "list",
            items: [
              "Agents — LLM-backed services that take a task and return a result, paid per call.",
              "Tools — single-capability endpoints (search, OCR, on-chain query…) that agents can autonomously discover and rent per call.",
            ],
          },
          {
            type: "callout",
            kind: "info",
            text: "blockbot is the first agent + tool discovery layer built natively for Stellar — filling a gap the Stellar Development Foundation has publicly acknowledged.",
          },
        ],
      },
      {
        slug: "install",
        title: "Install & init",
        content: [
          {
            type: "p",
            text: "Install the CLI globally and initialise a wallet on Stellar testnet.",
          },
          {
            type: "code",
            lang: "bash",
            code: "npm install -g blockbot\nblockbot init",
          },
          {
            type: "p",
            text: "init generates a new Stellar keypair, requests testnet XLM from Friendbot, and writes a config to ~/.blockbot/config.json.",
          },
          {
            type: "callout",
            kind: "tip",
            text: "Use --network mainnet to skip testnet entirely — but you'll need to fund the wallet yourself.",
          },
        ],
      },
      {
        slug: "quick-start",
        title: "Quick start",
        content: [
          {
            type: "p",
            text: "From zero to a paid agent that auto-rents tools, in three commands.",
          },
          { type: "h2", text: "1. Install" },
          {
            type: "code",
            lang: "bash",
            code: "npm install -g blockbot\nblockbot init",
          },
          { type: "h2", text: "2. Deploy" },
          {
            type: "code",
            lang: "bash",
            code: "cd my-researcher\nblockbot serve",
          },
          {
            type: "p",
            text: "Your agent is now live, behind an x402 payment gate, and registered on the Stellar registry.",
          },
          { type: "h2", text: "3. Call" },
          {
            type: "code",
            lang: "bash",
            code: 'blockbot call "market-analyst" "XLM price + tweet sentiment?"',
          },
          {
            type: "callout",
            kind: "tip",
            text: "If the agent is missing a capability mid-call, blockbot will discover a tool in the registry, pay for it, and return a composed result — no extra config.",
          },
        ],
      },
    ],
  },
  {
    title: "CLI reference",
    pages: [
      {
        slug: "cli-init",
        title: "blockbot init",
        content: [
          {
            type: "p",
            text: "Initialise a new blockbot config and Stellar wallet.",
          },
          {
            type: "code",
            lang: "bash",
            code: "blockbot init [--network testnet|mainnet] [--asset USDC|XLM]",
          },
        ],
      },
      {
        slug: "cli-serve",
        title: "blockbot serve",
        content: [
          {
            type: "p",
            text: "Start your agent or tool, expose it via tunnel, and register it on the Stellar registry.",
          },
          {
            type: "code",
            lang: "bash",
            code: "blockbot serve [--port 3000] [--price 0.10]",
          },
        ],
      },
      {
        slug: "cli-call",
        title: "blockbot call",
        content: [
          {
            type: "p",
            text: "Call any agent in the registry by name, with x402 payment auto-handled.",
          },
          {
            type: "code",
            lang: "bash",
            code: 'blockbot call "<agent-name>" "<task>"',
          },
        ],
      },
      {
        slug: "cli-tool",
        title: "blockbot tool",
        content: [
          { type: "p", text: "Manage tools: publish, list, call, deregister." },
          {
            type: "code",
            lang: "bash",
            code: 'blockbot tool publish ./tool.config.json\nblockbot tool list --category search\nblockbot tool call "tw-search" \'{"query":"stellar"}\'\nblockbot tool deregister "<tool-name>"',
          },
        ],
      },
      {
        slug: "cli-registry",
        title: "blockbot registry",
        content: [
          {
            type: "p",
            text: "Browse and search the live registry from the terminal.",
          },
          {
            type: "code",
            lang: "bash",
            code: "blockbot registry agents --network mainnet\nblockbot registry tools --category vision",
          },
        ],
      },
    ],
  },
  {
    title: "Agents",
    pages: [
      {
        slug: "agent-config",
        title: "agent.config.json",
        content: [
          {
            type: "p",
            text: "Every blockbot agent is described by an agent.config.json file at the project root.",
          },
          {
            type: "code",
            lang: "json",
            filename: "agent.config.json",
            code: `{
    "name": "market-analyst",
    "description": "Real-time XLM/USDC price data + DEX analysis",
    "model": "groq:llama-3.3-70b-versatile",
    "price": "0.10",
    "asset": "USDC",
    "network": "testnet",
    "tools": ["web_search", "get_crypto_price"]
  }`,
          },
        ],
      },
      {
        slug: "built-in-tools",
        title: "Built-in tools",
        content: [
          {
            type: "p",
            text: "blockbot ships with a library of zero-config tools you can attach to any agent.",
          },
          {
            type: "table",
            headers: ["Tool", "Description"],
            rows: [
              ["web_search", "Search the public web via DuckDuckGo."],
              ["get_crypto_price", "Spot price for any crypto asset."],
              ["horizon_query", "Read-only access to Stellar Horizon."],
              ["xdr_decode", "Decode XDR-encoded Stellar payloads."],
            ],
          },
        ],
      },
      {
        slug: "registry-tools",
        title: "Using registry tools",
        content: [
          {
            type: "p",
            text: "Agents can autonomously discover and rent tools from the global registry mid-call.",
          },
          {
            type: "code",
            lang: "ts",
            filename: "agent.ts",
            code: `import { blockbot } from "blockbot/agent";
  
  export async function handler(task: string) {
    // discover + pay + invoke in one call
    const tweets = await blockbot.tools.use("tw-search", {
      query: task, limit: 10,
    });
    return summarize(tweets.results);
  }`,
          },
          {
            type: "callout",
            kind: "info",
            text: "blockbot.tools.use handles registry lookup, x402 payment, and JSON-schema validation automatically.",
          },
        ],
      },
      {
        slug: "pricing-agents",
        title: "Pricing your agent",
        content: [
          {
            type: "p",
            text: "Set the price in agent.config.json. blockbot supports any positive USDC or XLM amount, including fractions of a cent.",
          },
          {
            type: "callout",
            kind: "tip",
            text: "Most agents start between 0.02 and 0.10 USDC per call — enough to cover LLM costs and a margin.",
          },
        ],
      },
    ],
  },
  {
    title: "Tools",
    pages: [
      {
        slug: "publishing-tool",
        title: "Publishing a tool",
        content: [
          {
            type: "p",
            text: "A blockbot tool is a single-capability HTTP endpoint with a JSON input + output schema, fronted by an x402 payment gate.",
          },
          {
            type: "code",
            lang: "json",
            filename: "tool.config.json",
            code: `{
    "name": "tw-search",
    "category": "search",
    "capability": "Search recent public tweets",
    "price": "0.02",
    "asset": "USDC",
    "input":  { "query": "string", "limit": "number?" },
    "output": { "results": "Result[]" }
  }`,
          },
          {
            type: "code",
            lang: "bash",
            code: "blockbot tool publish ./tool.config.json",
          },
        ],
      },
      {
        slug: "tool-config",
        title: "Tool config + schemas",
        content: [
          {
            type: "p",
            text: "Schemas are validated against incoming requests and outgoing responses. Type strings support TypeScript-flavoured shorthand.",
          },
        ],
      },
      {
        slug: "pricing-tools",
        title: "Pricing per call",
        content: [
          {
            type: "p",
            text: "Tools are typically priced lower than agents — between 0.005 and 0.05 USDC per call. Higher-cost tools (vision, audio) can charge more.",
          },
        ],
      },
      {
        slug: "tool-discovery",
        title: "Tool discovery from agents",
        content: [
          {
            type: "p",
            text: "Agents can search the registry programmatically by category, capability, or name.",
          },
          {
            type: "code",
            lang: "ts",
            code: `const candidates = await blockbot.tools.search({
    category: "search",
    maxPrice: "0.05",
  });`,
          },
        ],
      },
    ],
  },
  {
    title: "x402 payments",
    pages: [
      {
        slug: "how-x402-works",
        title: "How x402 works on Stellar",
        content: [
          {
            type: "p",
            text: "x402 is an HTTP-native micropayment protocol. The first request to an agent or tool returns a 402 Payment Required response with a payment quote. The client pays on Stellar, then retries the request with proof of payment in a header.",
          },
          {
            type: "code",
            lang: "bash",
            code: `# 1. probe
  GET /agent  →  402 Payment Required
                  X-Payment-Asset: USDC
                  X-Payment-Amount: 0.10
                  X-Payment-To:    GAGNT...
  
  # 2. pay on Stellar (SEP-41 transfer)
  # 3. retry
  GET /agent
    X-Payment-Tx: <tx-hash>
                                         →  200 OK + result`,
          },
          {
            type: "callout",
            kind: "info",
            text: "blockbot client + server SDKs handle this entire round trip automatically.",
          },
        ],
      },
      {
        slug: "usdc-xlm",
        title: "USDC + XLM",
        content: [
          {
            type: "p",
            text: "blockbot supports both USDC (Stellar SEP-41) and native XLM. USDC is recommended for stable pricing; XLM is recommended for the very smallest fees.",
          },
        ],
      },
      {
        slug: "wallet",
        title: "Wallet management",
        content: [
          {
            type: "p",
            text: "Every blockbot install has its own wallet, stored encrypted in ~/.blockbot/wallet.json. Export, rotate, or import keys with blockbot wallet.",
          },
        ],
      },
    ],
  },
  {
    title: "Registry API",
    pages: [
      {
        slug: "api-agents",
        title: "/api/agents",
        content: [
          { type: "p", text: "List, get, register, and deregister agents." },
          {
            type: "table",
            headers: ["Method", "Path", "Purpose"],
            rows: [
              [
                "GET",
                "/api/agents",
                "List agents (filters: ?type=&network=&search=)",
              ],
              ["GET", "/api/agents/:name", "Get a single agent by name"],
              ["POST", "/api/agents", "Register an agent"],
              [
                "DELETE",
                "/api/agents/:name",
                "Deregister an agent (owner-signed)",
              ],
            ],
          },
        ],
      },
      {
        slug: "api-tools",
        title: "/api/tools",
        content: [
          {
            type: "p",
            text: "List, get, register, deregister, and proxy-invoke tools.",
          },
          {
            type: "table",
            headers: ["Method", "Path", "Purpose"],
            rows: [
              [
                "GET",
                "/api/tools",
                "List tools (filters: ?category=&network=&search=)",
              ],
              [
                "GET",
                "/api/tools/:name",
                "Get a single tool incl. input/output schema",
              ],
              ["POST", "/api/tools", "Register a tool"],
              ["DELETE", "/api/tools/:name", "Deregister a tool"],
              [
                "POST",
                "/api/tools/:name/invoke",
                "Proxy invoke (returns 402 → x402 payment → result)",
              ],
            ],
          },
          {
            type: "code",
            lang: "json",
            filename: "Tool object",
            code: `{
    "name": "tw-search",
    "category": "search",
    "capability": "Search recent public tweets",
    "endpoint": "https://abc.ngrok.io/tool",
    "owner": "GTOOL...XYZ",
    "network": "testnet",
    "asset": "USDC",
    "pricePerCall": "0.02",
    "input":  { "query": "string", "limit": "number?" },
    "output": { "results": "Result[]" },
    "stats":  { "invocations": 412, "volume": "8.24", "p50ms": 380, "successRate": 0.992 }
  }`,
          },
        ],
      },
      {
        slug: "api-stats",
        title: "/api/stats",
        content: [
          {
            type: "p",
            text: "Global registry stats, including a recent payments feed.",
          },
        ],
      },
    ],
  },
  {
    title: "Recipes",
    pages: [
      {
        slug: "recipe-auto-rent",
        title: "Agent that auto-rents tools",
        content: [
          {
            type: "p",
            text: "Build an agent that delegates anything outside its built-in tools to a registry tool, automatically.",
          },
          {
            type: "code",
            lang: "ts",
            code: `export async function handler(task: string) {
    // try built-ins first, then fall back to the registry
    return blockbot.run(task, { autoRent: true, maxToolSpend: "0.10" });
  }`,
          },
        ],
      },
      {
        slug: "recipe-a2a",
        title: "Agent-to-agent orchestration",
        content: [
          {
            type: "p",
            text: "Compose multiple agents into a single user-facing agent that pays each sub-agent on call.",
          },
        ],
      },
      {
        slug: "recipe-pipeline",
        title: "Multi-tool research pipeline",
        content: [
          {
            type: "p",
            text: "Chain tw-search → web-fetch → ocr-extract → sum-stats into a single research agent.",
          },
        ],
      },
    ],
  },
  {
    title: "Troubleshooting",
    pages: [
      {
        slug: "common-errors",
        title: "Common errors",
        content: [
          {
            type: "table",
            headers: ["Code", "Meaning", "Fix"],
            rows: [
              ["E_WALLET", "No wallet found", "Run blockbot init"],
              [
                "E_FUNDS",
                "Wallet under-funded",
                "Top up via Friendbot or anchor",
              ],
              [
                "E_NOT_REG",
                "Agent not in registry",
                "Run blockbot serve to register",
              ],
              [
                "E_TUNNEL",
                "Tunnel connection failed",
                "Check ngrok auth or use --tunnel cloudflared",
              ],
            ],
          },
        ],
      },
      {
        slug: "network-tunnel",
        title: "Network + tunnel issues",
        content: [
          {
            type: "p",
            text: "blockbot uses ngrok by default. Switch with --tunnel cloudflared or --tunnel none if you prefer to expose your endpoint manually.",
          },
        ],
      },
    ],
  },
];

export const FLAT_PAGES = DOC_SECTIONS.flatMap((s) =>
  s.pages.map((p) => ({ ...p, section: s.title })),
);
