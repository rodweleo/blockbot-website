"use client";

import { DOC_SECTIONS } from "@/data/docs";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Sidebar() {
  const [openSec, setOpenSec] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(DOC_SECTIONS.map((s) => [s.title, true])),
  );
  const [version, setVersion] = useState("v0.1 (Latest Beta)");

  return (
    <ScrollArea className="h-[600px] w-[300px] rounded-md border p-4 space-y-4">
      <Select onValueChange={setVersion} value={version}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Doc Version" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="v0.1 (Latest Beta)">
              v0.1 (Latest Beta)
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <nav className="space-y-1 mt-4">
        {DOC_SECTIONS.map((s) => (
          <div key={s.title}>
            <button
              onClick={() =>
                setOpenSec((o) => ({ ...o, [s.title]: !o[s.title] }))
              }
              className="w-full flex items-center justify-between py-1.5 font-mono text-[10px] uppercase tracking-ui text-tertiary hover:text-foreground"
            >
              {s.title}
              <ChevronDown
                className={cn(
                  "h-3 w-3 transition-transform",
                  !openSec[s.title] && "-rotate-90",
                )}
              />
            </button>
            {openSec[s.title] && (
              <ul className="border-l-hairline border-border ml-1 pl-3 mb-2">
                {s.pages.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/docs/${p.slug}`}
                      className={cn(
                        "block py-1 font-mono text-[12.5px] transition-colors",
                        // p.slug === activeSlug
                        //   ? "text-primary"
                        //   : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </ScrollArea>
  );
}
