"use client";

import DocNavigator from "@/components/docs/DocNavigator";
import renderBlock from "@/components/docs/RenderBlock";
import { DOC_SECTIONS, DocPage, FLAT_PAGES } from "@/data/docs";
import { ExternalLink } from "lucide-react";
import { useParams } from "next/navigation";

export default function Page() {
  const { docId } = useParams();
  const activeSlug = docId ?? FLAT_PAGES[0].slug;
  const activeIdx = FLAT_PAGES.findIndex((p) => p.slug === activeSlug);
  const page: DocPage = FLAT_PAGES[activeIdx >= 0 ? activeIdx : 0];

  return (
    <main className="container mx-auto">
      <article className="min-w-0 max-w-2xl py-2">
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
      </article>
      <DocNavigator docSlug={docId as string} />
    </main>
  );
}
