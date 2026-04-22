import { FLAT_PAGES } from "@/data/docs";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DocNavigator({ docSlug }: { docSlug: string }) {
  const docId = docSlug;
  const activeSlug = docId ?? FLAT_PAGES[0].slug;
  const activeIdx = FLAT_PAGES.findIndex((p) => p.slug === activeSlug);
  const prev = activeIdx > 0 ? FLAT_PAGES[activeIdx - 1] : null;
  const next =
    activeIdx < FLAT_PAGES.length - 1 ? FLAT_PAGES[activeIdx + 1] : null;

  return (
    <div className="mt-16 grid sm:grid-cols-2 gap-3">
      {prev && (
        <Link
          href={`/docs/${prev.slug}`}
          className="bg-card border-hairline border-border rounded-card p-4 hover:border-primary transition-colors"
        >
          <div className="font-mono text-[10px] uppercase tracking-ui text-tertiary inline-flex items-center gap-1.5">
            <ArrowLeft className="h-3 w-3" /> Previous
          </div>
          <div className="mt-1 font-display font-bold text-sm">
            {prev.title}
          </div>
        </Link>
      )}
      {next && (
        <Link
          href={`/docs/${next.slug}`}
          className="bg-card border-hairline border-border rounded-card p-4 hover:border-primary transition-colors text-right"
        >
          <div className="font-mono text-[10px] uppercase tracking-ui text-tertiary inline-flex items-center gap-1.5">
            Next <ArrowRight className="h-3 w-3" />
          </div>
          <div className="mt-1 font-display font-bold text-sm">
            {next.title}
          </div>
        </Link>
      )}
    </div>
  );
}
