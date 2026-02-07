export default function ProximityIndicator() {
  return (
    <div className="hidden sm:flex items-center gap-2 rounded-full border bg-muted px-3 py-1.5">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-wider">
        Proximity Active
      </span>
    </div>
  );
}
