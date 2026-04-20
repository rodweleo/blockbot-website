import { cn } from "@/lib/utils";

type Variant = "neutral" | "price" | "network" | "tool" | "type" | "status";

interface PillProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

const variants: Record<Variant, string> = {
  neutral: "bg-surface-tertiary border-border text-muted-foreground",
  price: "bg-warning/15 border-warning/40 text-warning",
  network: "bg-info/15 border-info/40 text-info",
  tool: "bg-tool/15 border-tool/40 text-tool",
  type: "bg-surface-tertiary border-border text-foreground/80",
  status: "bg-primary/15 border-primary/40 text-primary",
};

export function Pill({ children, variant = "neutral", className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-pill border-hairline px-2 py-0.5",
        "font-mono text-[10px] leading-none whitespace-nowrap",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
