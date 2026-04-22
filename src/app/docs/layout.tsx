import Sidebar from "@/components/docs/Sidebar";

import { ReactNode } from "react";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="container mx-auto gap-4 h-full w-full">
      <section className="flex gap-5">
        <Sidebar />
        <div className="h-full w-full">{children}</div>
      </section>
    </main>
  );
}
