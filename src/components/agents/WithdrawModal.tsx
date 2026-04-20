"use client";

import { useState } from "react";
import { X, Loader2, Check, ArrowUpFromLine } from "lucide-react";
import { OwnedAgent } from "@/data/dashboard";
import { useWallet } from "@/contexts/WalletContext";
import { truncateAddress } from "@/lib/format";

export function WithdrawModal({
  agent,
  onClose,
}: {
  agent: OwnedAgent;
  onClose: () => void;
}) {
  const wallet = useWallet();
  const max = parseFloat(agent.agentWallet.balanceUsdc);
  const [amount, setAmount] = useState(Math.max(0, max - 0.1).toFixed(2));
  const [destination, setDestination] = useState(wallet.address ?? "");
  const [phase, setPhase] = useState<"idle" | "signing" | "done">("idle");

  async function send() {
    setPhase("signing");
    await new Promise((r) => setTimeout(r, 1500));
    setPhase("done");
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-background/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-card border-hairline border-border rounded-card w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <ArrowUpFromLine className="h-4 w-4 text-warning" />
            <h3 className="font-display font-bold text-lg">
              Withdraw from {agent.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-tertiary hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {phase === "done" ? (
          <div className="text-center py-6 fade-up">
            <div className="grid place-items-center h-12 w-12 rounded-full bg-primary/15 mx-auto mb-4">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <div className="font-display font-bold text-base mb-1">
              Withdrawn
            </div>
            <div className="font-mono text-[12px] text-muted-foreground">
              {amount} USDC sent to {truncateAddress(destination)} — settled in
              2.9s.
            </div>
            <button
              onClick={onClose}
              className="mt-5 px-4 py-2 rounded-md bg-primary text-primary-foreground font-display text-sm"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="bg-background border-hairline border-border rounded-md p-3 mb-4">
              <div className="flex items-center justify-between font-mono text-[12px]">
                <span className="text-tertiary">available balance</span>
                <span className="text-warning tabular-nums">
                  {agent.agentWallet.balanceUsdc} USDC
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-5">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-ui text-tertiary mb-2">
                  amount (USDC)
                </label>
                <div className="flex gap-2">
                  <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    min="0.01"
                    max={max}
                    step="0.01"
                    className="flex-1 bg-background border-hairline border-border rounded-md px-3 py-2.5 font-mono text-sm focus:outline-none focus:border-primary"
                  />
                  <button
                    onClick={() => setAmount(max.toFixed(2))}
                    className="px-3 py-2.5 rounded-md border-hairline border-border font-mono text-[11px] text-muted-foreground hover:text-foreground"
                  >
                    max
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-ui text-tertiary mb-2">
                  destination address
                </label>
                <input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-background border-hairline border-border rounded-md px-3 py-2.5 font-mono text-[11px] focus:outline-none focus:border-primary"
                />
                <p className="mt-1 font-mono text-[10px] text-tertiary">
                  defaults to your connected wallet
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={send}
                disabled={
                  phase === "signing" ||
                  parseFloat(amount) <= 0 ||
                  parseFloat(amount) > max
                }
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-primary text-primary-foreground font-display font-medium text-sm hover:bg-primary/90 disabled:opacity-50"
              >
                {phase === "signing" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> signing...
                  </>
                ) : (
                  <>Withdraw {amount} USDC</>
                )}
              </button>
              <button
                onClick={onClose}
                className="px-3 py-2.5 rounded-md border-hairline border-border text-muted-foreground font-display text-sm hover:text-foreground"
              >
                Cancel
              </button>
            </div>

            <p className="mt-4 font-mono text-[10px] text-tertiary text-center">
              The orchestrator signs from the encrypted agent secret key. The
              frontend never sees it.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
