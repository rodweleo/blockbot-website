"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { BuiltOnStellar } from "@/components/BuiltOnStellar";
import { WalletButton } from "@/components/Wallet/WalletButton";
import Image from "next/image";
import { ConnectButton } from "../auth/ConnectButton";
import { useFreighterAccount } from "@/hooks/useFreighterAccount";

const links = [
  { to: "/agents", label: "Agents" },
  // { to: "/tools", label: "Tools" },
  // { to: "/ask", label: "Ask" },
  { to: "/docs", label: "Docs" },
  { to: "/stats", label: "Stats" },
];

export function NavBar() {
  const { data } = useFreighterAccount();
  const [open, setOpen] = useState(false);
  const location = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-background/70 backdrop-blur-sm border-b-hairline border-border h-20 shadow-md shadow-primary/10">
      <nav className="container flex items-center h-full gap-4 mx-auto justify-between w-full">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/logo.png"
            width={500}
            height={500}
            alt="Blockbot"
            className="size-6 rounded-md"
          />
          <span className="font-display font-bold text-base tracking-tight">
            blockbot
          </span>
          <span className="hidden sm:inline-flex">
            <BuiltOnStellar size="sm" />
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-5    ">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                href={l.to}
                // className={({ isActive }) =>
                //   cn(
                //     "px-3 py-1.5 rounded-md text-sm font-display font-medium transition-colors",
                //     isActive
                //       ? "text-foreground bg-surface-tertiary"
                //       : "text-muted-foreground hover:text-foreground hover:bg-surface-tertiary/60",
                //   )
                // }
              >
                {l.label}
              </Link>
            </li>
          ))}
          {data && data.isConnected && (
            <li>
              <Link
                href="/dashboard"
                // className={({ isActive }) =>
                //   cn(
                //     "px-3 py-1.5 rounded-md text-sm font-display font-medium transition-colors",
                //     isActive
                //       ? "text-foreground bg-surface-tertiary"
                //       : "text-muted-foreground hover:text-foreground hover:bg-surface-tertiary/60",
                //   )
                // }
              >
                Dashboard
              </Link>
            </li>
          )}
          <li>
            <a
              href="https://github.com/blockbot-xyz/blockbot"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-tertiary/60 inline-flex items-center gap-1.5 text-sm font-display"
              aria-label="GitHub repository"
            >
              {/* <GitHub className="h-4 w-4" /> */}
            </a>
          </li>
        </ul>

        <div className="hidden md:flex items-center gap-2 ml-auto">
          <ConnectButton />
          <Link
            href="/studio"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground font-display font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            <Zap className="h-3.5 w-3.5" /> Deploy agent
          </Link>
        </div>

        <button
          className="md:hidden ml-auto p-2 text-foreground"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t-hairline border-border bg-background">
          <ul className="container py-3 flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  href={l.to}
                  onClick={() => setOpen(false)}
                  //   className={({ isActive }) =>
                  //     cn(conne
                  //       "block px-3 py-2 rounded-md text-sm font-display",
                  //       isActive
                  //         ? "text-foreground bg-surface-tertiary"
                  //         : "text-muted-foreground",
                  //     )
                  //   }
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {data && data.isConnected && (
              <li>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  //   className={({ isActive }) =>
                  //     cn(
                  //       "block px-3 py-2 rounded-md text-sm font-display",
                  //       isActive
                  //         ? "text-foreground bg-surface-tertiary"
                  //         : "text-muted-foreground",
                  //     )
                  //   }
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li>
              <a
                href="https://github.com/rodweleo/blockbot"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-muted-foreground text-sm font-display"
              >
                GitHub
              </a>
            </li>
            <li className="pt-2 flex flex-col gap-2">
              <ConnectButton />
              <Link
                href="/studio"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-primary text-primary-foreground font-display font-medium text-sm"
              >
                <Zap className="h-3.5 w-3.5" /> Deploy agent
              </Link>
            </li>
          </ul>
        </div>
      )}
      <span className="hidden" key={location} />
    </header>
  );
}
