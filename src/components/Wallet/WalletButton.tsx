"use client";

import { Loader2, LogOut, Wallet } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { truncateAddress } from "@/lib/format";
import Link from "next/link";

export function WalletButton({ compact = false }: { compact?: boolean }) {
  const { connected, address, connecting, connect, disconnect } = useWallet();

  if (connecting) {
    return (
      <button
        disabled
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border-hairline border-border bg-card font-mono text-[11px] text-muted-foreground"
      >
        <Loader2 className="h-3.5 w-3.5 animate-spin" /> connecting...
      </button>
    );
  }

  if (connected && address) {
    return (
      <div className="inline-flex items-center gap-1">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border-hairline border-primary/40 bg-primary/10 font-mono text-[11px] text-primary hover:bg-primary/15 transition-colors"
          title={address}
        >
          <span className="relative h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
          {truncateAddress(address)}
        </Link>
        {!compact && (
          <button
            onClick={disconnect}
            className="p-1.5 rounded-md text-tertiary hover:text-foreground hover:bg-surface-tertiary"
            aria-label="Disconnect wallet"
            title="Disconnect"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={connect}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border-hairline border-border bg-card font-mono text-[11px] text-foreground hover:border-primary hover:text-primary transition-colors"
    >
      <Wallet className="h-3.5 w-3.5" /> connect freighter
    </button>
  );
}
