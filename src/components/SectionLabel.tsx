import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}

export function SectionLabel({
  children,
  right,
  className,
}: SectionLabelProps) {
  return (
    <div className={cn("flex items-end justify-between mb-6", className)}>
      <span className="font-mono text-[11px] uppercase tracking-ui text-tertiary">
        {children}
      </span>
      {right && (
        <span className="font-mono text-[11px] text-tertiary">{right}</span>
      )}
    </div>
  );
}
