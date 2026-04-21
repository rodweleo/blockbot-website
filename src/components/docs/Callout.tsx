import { cn } from "@/lib/utils";

export default function Callout({
  kind,
  text,
}: {
  kind: "info" | "tip" | "warn";
  text: string;
}) {
  const map = {
    info: "border-info bg-info/5 text-foreground",
    tip: "border-primary bg-primary/5 text-foreground",
    warn: "border-warning bg-warning/5 text-foreground",
  } as const;
  const label = { info: "INFO", tip: "TIP", warn: "WARN" }[kind];
  return (
    <div
      className={cn(
        "border-l-2 rounded-r-md px-4 py-3 my-4 font-mono text-[13px] leading-relaxed",
        map[kind],
      )}
    >
      <span className="text-tertiary mr-2 text-[10px] tracking-ui">
        {label}
      </span>
      {text}
    </div>
  );
}
