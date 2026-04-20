export default function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b-hairline border-border/60 py-1">
      <span className="text-tertiary">{k}</span>
      <span className="text-foreground truncate">{v}</span>
    </div>
  );
}
