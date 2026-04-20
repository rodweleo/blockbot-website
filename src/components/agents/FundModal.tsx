"use client";
import { useState } from "react";
import { X, Loader2, Check, ArrowDownToLine } from "lucide-react";
import { OwnedAgent } from "@/data/dashboard";
import { truncateAddress } from "@/lib/format";

export function FundModal({
  agent,
  onClose,
}: {
  agent: OwnedAgent;
  onClose: () => void;
}) {
  const [amount, setAmount] = useState("5");
  const [phase, setPhase] = useState<"idle" | "signing" | "done">("idle");

  async function send() {
    setPhase("signing");
    await new Promise((r) => setTimeout(r, 1400));
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
            <ArrowDownToLine className="h-4 w-4 text-primary" />
            <h3 className="font-display font-bold text-lg">
              Fund {agent.name}
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
            <div className="font-display font-bold text-base mb-1">Funded</div>
            <div className="font-mono text-[12px] text-muted-foreground">
              Sent {amount} USDC to agent wallet — settled in 3.1s.
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
              <div className="font-mono text-[10px] uppercase tracking-ui text-tertiary mb-1">
                agent wallet
              </div>
              <div className="font-mono text-[12px] text-foreground">
                {truncateAddress(agent.agentWallet.address)}
              </div>
            </div>

            <div className="space-y-3 mb-5">
              <label className="block font-mono text-[10px] uppercase tracking-ui text-tertiary">
                amount (USDC)
              </label>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                min="0.01"
                step="0.01"
                className="w-full bg-background border-hairline border-border rounded-md px-3 py-2.5 font-mono text-sm focus:outline-none focus:border-primary"
              />
              <div className="flex gap-1.5">
                {["1", "5", "10", "25"].map((v) => (
                  <button
                    key={v}
                    onClick={() => setAmount(v)}
                    className="px-2.5 py-1 rounded-pill border-hairline border-border font-mono text-[11px] text-muted-foreground hover:text-foreground"
                  >
                    ${v}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-background border-hairline border-border rounded-md p-3 mb-4">
              <div className="font-mono text-[11px] text-tertiary mb-1">
                via Freighter
              </div>
              <div className="font-mono text-[11px] text-muted-foreground">
                You'll be asked to approve a {amount} USDC transfer to this
                agent.
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={send}
                disabled={phase === "signing" || parseFloat(amount) <= 0}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-primary text-primary-foreground font-display font-medium text-sm hover:bg-primary/90 disabled:opacity-50"
              >
                {phase === "signing" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> awaiting
                    Freighter...
                  </>
                ) : (
                  <>Send {amount} USDC</>
                )}
              </button>
              <button
                onClick={onClose}
                className="px-3 py-2.5 rounded-md border-hairline border-border text-muted-foreground font-display text-sm hover:text-foreground"
              >
                Cancel
              </button>
            </div>

            <details className="mt-4">
              <summary className="font-mono text-[11px] text-tertiary cursor-pointer hover:text-foreground">
                manual transfer (QR)
              </summary>
              <div className="mt-3 bg-background border-hairline border-border rounded-md p-3 font-mono text-[11px] text-muted-foreground">
                Send any amount of USDC to:
                <br />
                <span className="text-foreground break-all">
                  {agent.agentWallet.address}
                </span>
              </div>
            </details>
          </>
        )}
      </div>
    </div>
  );
}
