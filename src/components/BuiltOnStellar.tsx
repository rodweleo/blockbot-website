import { cn } from "@/lib/utils";

interface BuiltOnStellarProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "text-[10px] px-2.5 py-1 gap-1.5",
  md: "text-[11px] px-3 py-1.5 gap-2",
  lg: "text-[13px] px-4 py-2 gap-2.5",
} as const;

const glyphSize = {
  sm: "h-2.5 w-2.5",
  md: "h-3 w-3",
  lg: "h-3.5 w-3.5",
} as const;

export function BuiltOnStellar({
  size = "md",
  className,
}: BuiltOnStellarProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border-hairline border-border bg-transparent",
        "font-display font-medium uppercase text-muted-foreground tracking-ui",
        "transition-colors hover:border-primary hover:text-foreground",
        sizeMap[size],
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("text-primary", glyphSize[size])}
        aria-hidden
      >
        <path
          d="M12 2 L22 12 L12 22 L2 12 Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M12 6 L18 12 L12 18 L6 12 Z"
          fill="currentColor"
          opacity="0.85"
        />
      </svg>
      Built on Stellar
    </span>
  );
}
