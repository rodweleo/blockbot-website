import { DocBlock } from "@/data/docs";
import slugify from "./slugify";
import { CodeBlock } from "../CodeBlock";
import Callout from "./Callout";

export default function renderBlock(b: DocBlock, i: number) {
  switch (b.type) {
    case "p":
      return (
        <p
          key={i}
          className="font-mono text-[14px] text-muted-foreground leading-[1.8] my-4"
        >
          {b.text}
        </p>
      );
    case "h2":
      return (
        <h2
          key={i}
          id={slugify(b.text)}
          className="font-display font-bold text-2xl mt-10 mb-3 scroll-mt-20"
        >
          {b.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={i}
          id={slugify(b.text)}
          className="font-display font-bold text-lg mt-6 mb-2 scroll-mt-20"
        >
          {b.text}
        </h3>
      );
    case "code":
      return (
        <div key={i} className="my-4">
          <CodeBlock lang={b.lang} filename={b.filename} code={b.code} />
        </div>
      );
    case "callout":
      return <Callout key={i} kind={b.kind} text={b.text} />;
    case "list":
      return (
        <ul
          key={i}
          className="list-disc list-outside pl-5 my-4 space-y-1.5 font-mono text-[13.5px] text-muted-foreground leading-relaxed"
        >
          {b.items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div
          key={i}
          className="my-5 overflow-x-auto bg-card border-hairline border-border rounded-card"
        >
          <table className="w-full font-mono text-[12.5px]">
            <thead className="bg-surface-tertiary border-b-hairline border-border">
              <tr>
                {b.headers.map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-2.5 text-tertiary uppercase text-[10px] tracking-ui"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {b.rows.map((r, ri) => (
                <tr key={ri}>
                  {r.map((c, ci) => (
                    <td key={ci} className="px-4 py-2.5 text-foreground/90">
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}
