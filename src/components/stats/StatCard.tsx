export const StatCard = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: any;
}) => (
  <div className="bg-card border border-border rounded-[12px] p-6 md:p-8">
    <div className="flex items-start justify-between mb-4">
      <div>
        <p
          className="text-xs text-muted-foreground uppercase tracking-wider mb-2"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          {label}
        </p>
        <p
          className="text-3xl md:text-4xl font-bold text-foreground"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {value}
        </p>
      </div>
      <Icon className="w-8 h-8 text-accent" />
    </div>
  </div>
);
