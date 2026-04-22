"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Search } from "lucide-react";

import { DOC_SECTIONS, FLAT_PAGES, type DocPage } from "@/data/docs";
import CommandK from "@/components/docs/CommandK";
import Link from "next/link";
import renderBlock from "@/components/docs/RenderBlock";
import DocNavigator from "@/components/docs/DocNavigator";

export default function DocsPage() {
  const activeSlug = FLAT_PAGES[0].slug;
  const activeIdx = FLAT_PAGES.findIndex((p) => p.slug === activeSlug);
  const page: DocPage = FLAT_PAGES[activeIdx >= 0 ? activeIdx : 0];

  const [cmdkOpen, setCmdkOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdkOpen((o) => !o);
      } else if (e.key === "Escape") {
        setCmdkOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [activeSlug]);

  return (
    <div className="container mx-auto">
      <CommandK open={cmdkOpen} onClose={() => setCmdkOpen(false)} />

      {/* Top search */}
      <div className="mb-6">
        <button
          onClick={() => setCmdkOpen(true)}
          className="w-full md:max-w-md flex items-center gap-2 bg-card border-hairline border-border rounded-md px-3 py-2 text-left text-sm font-mono text-tertiary hover:border-primary/40 transition-colors"
        >
          <Search className="h-4 w-4" />
          <span>search docs</span>
          <kbd className="ml-auto font-mono text-[10px] text-tertiary border-hairline border-border rounded px-1.5 py-0.5">
            ⌘K
          </kbd>
        </button>
      </div>

      <div className="  w-full">
        {/* MAIN */}
        <article className="min-w-0 w-full py-2">
          <div className="font-mono text-[10px] uppercase tracking-ui text-tertiary mb-2">
            {DOC_SECTIONS.find((s) => s.pages.includes(page))?.title}
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tighter mb-2">
            {page.title}
          </h1>
          <div className="flex items-center gap-3 mb-8 font-mono text-[11px] text-tertiary">
            <span>Last updated {new Date().toLocaleDateString()}</span>
            <span>·</span>
            <a
              href={`https://github.com/rodweleo/blockbot/edit/main/docs/${page.slug}.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-foreground"
            >
              Edit on GitHub <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div>{page.content.map((b, i) => renderBlock(b, i))}</div>

          {/* Prev / Next */}
          <DocNavigator docSlug={activeSlug} />
        </article>
      </div>
    </div>
  );
}
