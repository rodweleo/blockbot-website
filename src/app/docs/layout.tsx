import Sidebar from "@/components/docs/Sidebar";
import { FLAT_PAGES, DocPage } from "@/data/docs";
import { Link, ArrowLeft, ArrowRight } from "lucide-react";
import next from "next";
import { ReactNode } from "react";

export default function DocsLayout({ children }: { children: ReactNode }) {
  //   const link = window.location.pathname;
  //   console.log(link);
  const docId = "install";
  const activeSlug = docId ?? FLAT_PAGES[0].slug;
  const activeIdx = FLAT_PAGES.findIndex((p) => p.slug === activeSlug);
  const page: DocPage = FLAT_PAGES[activeIdx >= 0 ? activeIdx : 0];
  const prev = activeIdx > 0 ? FLAT_PAGES[activeIdx - 1] : null;
  const next =
    activeIdx < FLAT_PAGES.length - 1 ? FLAT_PAGES[activeIdx + 1] : null;

  console.log(next);
  return (
    <main className="container mx-auto  gap-4">
      <section className="flex gap-5">
        <Sidebar />
        {children}
      </section>
      <div className="mt-16 grid sm:grid-cols-2 gap-3">
        {prev ? (
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
        ) : (
          <span />
        )}
        {next ? (
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
        ) : (
          <span />
        )}
      </div>
    </main>
  );
}
