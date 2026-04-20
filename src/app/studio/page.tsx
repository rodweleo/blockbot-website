"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  Wallet,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";
import { SectionLabel } from "@/components/SectionLabel";
import { CodeBlock } from "@/components/CodeBlock";
import { useWallet } from "@/contexts/WalletContext";
import { slugify, truncateAddress } from "@/lib/format";
import { cn } from "@/lib/utils";
import Row from "@/components/utils/Row";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CATEGORIES = [
  "Finance",
  "Legal",
  "Health",
  "Research",
  "Data",
  "Crypto",
  "General",
] as const;
const CORE_TOOLS = [
  {
    id: "get_stellar_balance",
    label: "get_stellar_balance",
    desc: "Read account USDC + XLM balance.",
  },
  {
    id: "send_stellar_payment",
    label: "send_stellar_payment",
    desc: "Send a payment from the agent wallet.",
  },
  {
    id: "resolve_agent",
    label: "resolve_agent",
    desc: "Resolve an agent name to an endpoint.",
  },
  {
    id: "call_agent",
    label: "call_agent",
    desc: "Pay + invoke another blockbot agent.",
  },
  {
    id: "list_agents",
    label: "list_agents",
    desc: "List agents from the registry.",
  },
  {
    id: "get_stellar_account_info",
    label: "get_stellar_account_info",
    desc: "Trustlines, signers, sequence.",
  },
];
const OPTIONAL_TOOLS = [
  {
    id: "web_search",
    label: "web_search",
    desc: "Real-time web search.",
    cost: "+$0.001/call",
  },
  {
    id: "read_url",
    label: "read_url",
    desc: "Fetch + clean any public URL.",
    cost: "+$0.001/call",
  },
  {
    id: "get_crypto_price",
    label: "get_crypto_price",
    desc: "Cross-exchange spot prices.",
    cost: "+$0.002/call",
  },
  {
    id: "get_stellar_dex",
    label: "get_stellar_dex",
    desc: "Order books + paths.",
    cost: "+$0.001/call",
  },
  {
    id: "get_soroban_data",
    label: "get_soroban_data",
    desc: "Read Soroban contract state.",
    cost: "+$0.001/call",
  },
];
const PRESETS = [
  { label: "Quick", price: "0.05" },
  { label: "Standard", price: "0.10" },
  { label: "Premium", price: "0.50" },
  { label: "Expert", price: "1.00" },
];
const MODELS = [
  {
    id: "llama-3.3-70b-versatile",
    label: "llama-3.3-70b-versatile",
    note: "recommended",
  },
  {
    id: "llama-3.1-8b-instant",
    label: "llama-3.1-8b-instant",
    note: "fastest",
  },
  {
    id: "mixtral-8x7b-32768",
    label: "mixtral-8x7b-32768",
    note: "long context",
  },
  { id: "gemma2-9b-it", label: "gemma2-9b-it", note: "lightweight" },
];

const STEPS = [
  "Identity",
  "Tools",
  "Pricing",
  "LLM",
  "Wallet & deploy",
  "Live",
] as const;

const DEPLOY_STEPS = [
  "Creating agent directory...",
  "Installing dependencies...",
  "Configuring x402 payment gate...",
  "Starting agent process (PM2)...",
  "Registering in global registry...",
];

export default function StudioPage() {
  const navigate = useRouter();
  const wallet = useWallet();
  const [step, setStep] = useState(0);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] =
    useState<(typeof CATEGORIES)[number]>("Crypto");
  const [tools, setTools] = useState<string[]>([
    "web_search",
    "get_crypto_price",
  ]);
  const [price, setPrice] = useState("0.10");
  const [asset, setAsset] = useState<"USDC" | "XLM">("USDC");
  const [network, setNetwork] = useState<"testnet" | "mainnet">("testnet");
  const [model, setModel] = useState(MODELS[0].id);
  const [groqKey, setGroqKey] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");

  // Deploy state
  const [deployDone, setDeployDone] = useState<number>(-1);
  const slug = useMemo(() => slugify(name) || "your-agent", [name]);
  const dailyEarnings = (parseFloat(price || "0") * 100).toFixed(2);

  function toggleTool(id: string) {
    setTools((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]));
  }

  function next() {
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function startDeploy() {
    setStep(5);
    setDeployDone(-1);
    for (let i = 0; i < DEPLOY_STEPS.length; i++) {
      await new Promise((r) => setTimeout(r, 700));
      setDeployDone(i);
    }
  }

  const canAdvance =
    (step === 0 && name.trim().length >= 3 && description.trim().length > 0) ||
    step === 1 ||
    (step === 2 && parseFloat(price) > 0) ||
    (step === 3 && model && groqKey.trim().length > 0) ||
    (step === 4 && wallet.connected) ||
    step === 5;

  return (
    <div className="container py-12">
      <header className="mb-8">
        <SectionLabel>// studio — no-code deploy</SectionLabel>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tighter">
              Deploy your agent
            </h1>
            <p className="mt-2 font-mono text-sm text-muted-foreground">
              No terminal. No infra. Just a wallet.
            </p>
          </div>
          <div className="font-mono text-[11px] text-tertiary">
            step {step + 1} / {STEPS.length} — {STEPS[step]}
          </div>
        </div>

        {/* Step indicator */}
        <ol className="mt-6 flex items-center gap-2 overflow-x-auto pb-1">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-2 shrink-0">
              <span
                className={cn(
                  "grid place-items-center h-6 w-6 rounded-full border-hairline font-mono text-[10px]",
                  i < step &&
                    "bg-primary border-primary text-primary-foreground",
                  i === step && "border-primary text-primary",
                  i > step && "border-border text-tertiary",
                )}
              >
                {i < step ? <Check className="h-3 w-3" /> : i + 1}
              </span>
              <span
                className={cn(
                  "font-mono text-[11px]",
                  i === step ? "text-foreground" : "text-tertiary",
                )}
              >
                {s}
              </span>
              {i < STEPS.length - 1 && <span className="w-6 h-px bg-border" />}
            </li>
          ))}
        </ol>
      </header>

      <div className="grid lg:grid-cols-[1fr,360px] gap-6">
        {/* Main panel */}
        <div className="bg-card border-hairline border-border rounded-card p-6 sm:p-8 min-h-[480px]">
          {step === 0 && (
            <div className="space-y-6">
              <h2 className="font-display font-bold text-xl">
                What does your agent do?
              </h2>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-ui text-tertiary mb-2">
                  agent name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="market-analyst"
                  className="w-full bg-background border-hairline border-border rounded-md px-3 py-2.5 font-mono text-sm focus:outline-none focus:border-primary"
                />
                <p className="mt-1.5 font-mono text-[11px] text-tertiary">
                  slug → <span className="text-primary">{slug}</span>
                </p>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-ui text-tertiary mb-2">
                  description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value.slice(0, 200))}
                  placeholder="One sentence — what does this agent do?"
                  rows={3}
                  className="w-full bg-background border-hairline border-border rounded-md px-3 py-2.5 font-mono text-sm focus:outline-none focus:border-primary resize-none"
                />
                <p className="mt-1.5 font-mono text-[11px] text-tertiary text-right">
                  {description.length} / 200
                </p>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-ui text-tertiary mb-2">
                  category
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={cn(
                        "px-3 py-1.5 rounded-pill border-hairline font-mono text-[11px] transition-colors",
                        category === c
                          ? "bg-primary/15 border-primary text-primary"
                          : "border-border text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="font-display font-bold text-xl">
                What tools does it need?
              </h2>

              <div>
                <SectionLabel>// core stellar tools (always on)</SectionLabel>
                <div className="grid sm:grid-cols-2 gap-2">
                  {CORE_TOOLS.map((t) => (
                    <div
                      key={t.id}
                      className="bg-background border-hairline border-border rounded-md p-3 opacity-80"
                    >
                      <div className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                        <div>
                          <div className="font-mono text-[12px] text-foreground">
                            {t.label}
                          </div>
                          <div className="font-mono text-[11px] text-tertiary">
                            {t.desc}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SectionLabel>// optional tools</SectionLabel>
                <div className="grid sm:grid-cols-2 gap-2">
                  {OPTIONAL_TOOLS.map((t) => {
                    const active = tools.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        onClick={() => toggleTool(t.id)}
                        className={cn(
                          "text-left bg-background border-hairline rounded-md p-3 transition-colors",
                          active
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-foreground/40",
                        )}
                      >
                        <div className="flex items-start gap-2">
                          <span
                            className={cn(
                              "grid place-items-center h-3.5 w-3.5 rounded-sm border mt-0.5 shrink-0",
                              active
                                ? "bg-primary border-primary"
                                : "border-border",
                            )}
                          >
                            {active && (
                              <Check className="h-2.5 w-2.5 text-primary-foreground" />
                            )}
                          </span>
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <div className="font-mono text-[12px] text-foreground">
                                {t.label}
                              </div>
                              <span className="font-mono text-[10px] text-warning">
                                {t.cost}
                              </span>
                            </div>
                            <div className="font-mono text-[11px] text-tertiary">
                              {t.desc}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-display font-bold text-xl">
                How much does it charge?
              </h2>

              <div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-display font-extrabold text-4xl text-warning tabular-nums">
                    {parseFloat(price).toFixed(2)}
                  </span>
                  <span className="font-mono text-sm text-muted-foreground">
                    {asset} per call
                  </span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="2"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between font-mono text-[10px] text-tertiary mt-1">
                  <span>$0.01</span>
                  <span>$0.50</span>
                  <span>$1.00</span>
                  <span>$2.00</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setPrice(p.price)}
                    className={cn(
                      "px-3 py-1.5 rounded-pill border-hairline font-mono text-[11px]",
                      price === p.price
                        ? "bg-warning/15 border-warning text-warning"
                        : "border-border text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {p.label} ${p.price}
                  </button>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-ui text-tertiary mb-2">
                    asset
                  </label>
                  <div className="flex gap-2">
                    {(["USDC", "XLM"] as const).map((a) => (
                      <button
                        key={a}
                        onClick={() => setAsset(a)}
                        className={cn(
                          "px-3 py-1.5 rounded-md border-hairline font-mono text-[11px]",
                          asset === a
                            ? "border-primary text-primary bg-primary/10"
                            : "border-border text-muted-foreground",
                        )}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-ui text-tertiary mb-2">
                    network
                  </label>
                  <div className="flex gap-2">
                    {(["testnet", "mainnet"] as const).map((n) => (
                      <button
                        key={n}
                        onClick={() => setNetwork(n)}
                        className={cn(
                          "px-3 py-1.5 rounded-md border-hairline font-mono text-[11px]",
                          network === n
                            ? n === "mainnet"
                              ? "border-primary text-primary bg-primary/10"
                              : "border-info text-info bg-info/10"
                            : "border-border text-muted-foreground",
                        )}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-background border-hairline border-border rounded-md p-4">
                <div className="font-mono text-[11px] text-tertiary uppercase tracking-ui mb-1">
                  estimated earnings
                </div>
                <div className="font-mono text-sm text-foreground">
                  at 100 calls/day →{" "}
                  <span className="text-warning">${dailyEarnings} / day</span>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="font-display font-bold text-xl">
                What LLM powers it?
              </h2>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-ui text-tertiary mb-2">
                  model
                </label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {MODELS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setModel(m.id)}
                      className={cn(
                        "text-left bg-background border-hairline rounded-md p-3",
                        model === m.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-foreground/40",
                      )}
                    >
                      <div className="font-mono text-[12px] text-foreground">
                        {m.label}
                      </div>
                      <div className="font-mono text-[10px] text-tertiary mt-0.5">
                        {m.note}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-ui text-tertiary mb-2">
                  groq api key
                </label>
                <input
                  type="password"
                  value={groqKey}
                  onChange={(e) => setGroqKey(e.target.value)}
                  placeholder="gsk_..."
                  className="w-full bg-background border-hairline border-border rounded-md px-3 py-2.5 font-mono text-sm focus:outline-none focus:border-primary"
                />
                <p className="mt-1.5 font-mono text-[11px] text-tertiary">
                  Get a free key at{" "}
                  <a
                    className="text-info hover:underline"
                    href="https://console.groq.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    console.groq.com
                  </a>{" "}
                  — stored AES-256 encrypted on the VPS.
                </p>
              </div>

              <details className="bg-background border-hairline border-border rounded-md p-3">
                <summary className="font-mono text-[12px] text-muted-foreground cursor-pointer">
                  advanced — system prompt
                </summary>
                <textarea
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  rows={4}
                  placeholder="You are a Stellar market analyst..."
                  className="mt-2 w-full bg-background border-hairline border-border rounded-md px-3 py-2 font-mono text-[12px] resize-none focus:outline-none focus:border-primary"
                />
              </details>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="font-display font-bold text-xl">
                Connect wallet & deploy
              </h2>

              <div className="grid sm:grid-cols-2 gap-3">
                <div
                  className={cn(
                    "bg-background border-hairline rounded-md p-4",
                    wallet.connected
                      ? "border-primary bg-primary/5"
                      : "border-border",
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="h-4 w-4 text-primary" />
                    <span className="font-display font-bold text-sm">
                      Freighter
                    </span>
                  </div>
                  {wallet.connected && wallet.address ? (
                    <div className="font-mono text-[12px] text-primary">
                      connected — {truncateAddress(wallet.address)}
                    </div>
                  ) : (
                    <button
                      onClick={wallet.connect}
                      disabled={wallet.connecting}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary text-primary-foreground font-display font-medium text-sm hover:bg-primary/90 disabled:opacity-50"
                    >
                      {wallet.connecting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Wallet className="h-4 w-4" />
                      )}
                      Connect Freighter
                    </button>
                  )}
                </div>
                <div className="bg-background border-hairline border-border rounded-md p-4 opacity-70">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-bold text-sm">
                      Custodial wallet
                    </span>
                    <span className="font-mono text-[10px] text-tertiary border-hairline border-border rounded-pill px-2 py-0.5">
                      coming soon
                    </span>
                  </div>
                  <input
                    disabled
                    placeholder="you@example.com"
                    className="w-full bg-background border-hairline border-border rounded-md px-3 py-2 font-mono text-[12px]"
                  />
                </div>
              </div>

              <div className="bg-background border-hairline border-border rounded-md p-4">
                <SectionLabel>// summary</SectionLabel>
                <dl className="grid sm:grid-cols-2 gap-y-2 gap-x-6 font-mono text-[12px]">
                  <Row k="name" v={slug} />
                  <Row k="category" v={category} />
                  <Row
                    k="price"
                    v={`${parseFloat(price).toFixed(2)} ${asset}`}
                  />
                  <Row k="network" v={network} />
                  <Row k="model" v={model} />
                  <Row
                    k="tools"
                    v={`${tools.length + CORE_TOOLS.length} (${CORE_TOOLS.length} core, ${tools.length} optional)`}
                  />
                </dl>
              </div>

              <button
                onClick={startDeploy}
                disabled={!wallet.connected}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-primary text-primary-foreground font-display font-bold text-sm hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Zap className="h-4 w-4" /> Deploy {slug}
              </button>
              {!wallet.connected && (
                <p className="font-mono text-[11px] text-tertiary text-center">
                  Connect your wallet to deploy.
                </p>
              )}
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <h2 className="font-display font-bold text-xl">
                Deploying {slug}...
              </h2>
              <pre className="bg-background border-hairline border-border rounded-md p-4 font-mono text-[12px] leading-[1.9] min-h-[180px]">
                {DEPLOY_STEPS.map((s, i) => (
                  <div
                    key={s}
                    className={cn(
                      "transition-opacity",
                      i <= deployDone ? "opacity-100" : "opacity-30",
                    )}
                  >
                    [{i + 1}/5] {s}{" "}
                    {i < deployDone && <span className="text-primary">✓</span>}
                    {i === deployDone &&
                      deployDone < DEPLOY_STEPS.length - 1 && (
                        <Loader2 className="inline h-3 w-3 animate-spin text-primary" />
                      )}
                    {i === DEPLOY_STEPS.length - 1 &&
                      deployDone === DEPLOY_STEPS.length - 1 && (
                        <span className="text-primary">✓</span>
                      )}
                  </div>
                ))}
              </pre>

              {deployDone === DEPLOY_STEPS.length - 1 && (
                <div className="space-y-4 fade-up">
                  <div className="bg-primary/10 border-hairline border-primary/40 rounded-md p-4">
                    <div className="flex items-center gap-2 font-display font-bold text-primary mb-2">
                      <Sparkles className="h-4 w-4" /> Your agent is live!
                    </div>
                    <div className="font-mono text-[12px] space-y-1 text-foreground">
                      <div>
                        endpoint:{" "}
                        <span className="text-primary">
                          https://{slug}.blockbot.xyz/agent
                        </span>
                      </div>
                      <div>registry: blockbot.xyz/agents/{slug}</div>
                      <div>
                        price: {parseFloat(price).toFixed(2)} {asset} per call
                      </div>
                    </div>
                  </div>
                  <CodeBlock
                    lang="bash"
                    code={`# Anyone can call your agent\n$ blockbot call ${slug} "your prompt"\n  ✓ Paid ${parseFloat(price).toFixed(2)} ${asset}\n  ✓ Settled in 3.2s`}
                  />
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => navigate.push("/dashboard")}
                      className="px-4 py-2.5 rounded-md bg-primary text-primary-foreground font-display font-medium text-sm"
                    >
                      Go to dashboard →
                    </button>
                    <button
                      onClick={() => {
                        setStep(0);
                        setName("");
                        setDescription("");
                        setDeployDone(-1);
                      }}
                      className="px-4 py-2.5 rounded-md border-hairline border-border text-foreground font-display font-medium text-sm hover:border-primary"
                    >
                      Deploy another
                    </button>
                    <Link
                      href={`/agents/${slug}`}
                      className="px-4 py-2.5 rounded-md border-hairline border-border text-muted-foreground font-display font-medium text-sm hover:text-foreground"
                    >
                      Share agent link
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Nav */}
          {step < 5 && (
            <div className="flex justify-between mt-8 pt-6 border-t-hairline border-border">
              <button
                onClick={back}
                disabled={step === 0}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground font-display text-sm disabled:opacity-30"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              {step < 4 && (
                <button
                  onClick={next}
                  disabled={!canAdvance}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-display font-medium text-sm hover:bg-primary/90 disabled:opacity-40"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Live preview sidebar */}
        <aside className="space-y-4">
          <div className="bg-card border-hairline border-border rounded-card p-5 sticky top-20">
            <SectionLabel>// live preview</SectionLabel>
            <div className="bg-background border-hairline border-border rounded-card p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="grid place-items-center h-9 w-9 rounded-md bg-surface-tertiary border-hairline border-border text-base">
                  🤖
                </span>
                <div>
                  <div className="font-display font-bold text-sm leading-tight">
                    {slug}
                  </div>
                  <div className="mt-1 inline-flex items-center gap-1.5">
                    <span className="relative h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
                    <span className="font-mono text-[10px] text-primary">
                      live
                    </span>
                  </div>
                </div>
              </div>
              <p className="font-mono text-[11px] text-muted-foreground leading-relaxed mb-3 line-clamp-3 min-h-[40px]">
                {description || (
                  <span className="text-tertiary">
                    Description appears here as you type...
                  </span>
                )}
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-pill bg-surface-tertiary border-hairline border-border">
                  {category.toLowerCase()}
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-pill bg-warning/15 text-warning">
                  {parseFloat(price).toFixed(2)} {asset}
                </span>
                <span
                  className={cn(
                    "font-mono text-[10px] px-2 py-0.5 rounded-pill",
                    network === "testnet"
                      ? "bg-info/15 text-info"
                      : "bg-primary/15 text-primary",
                  )}
                >
                  {network}
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-tertiary">
              <Shield className="h-3 w-3" /> non-custodial · keys never leave
              the VPS
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
