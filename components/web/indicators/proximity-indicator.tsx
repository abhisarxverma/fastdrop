import Ping from "../reusables/ping";

export default function ProximityIndicator() {
  return (
    <div className="hidden sm:flex items-center gap-2 rounded-full border bg-muted px-3 py-1.5">
      <Ping color="blue" />
      <span className="text-[10px] font-semibold uppercase tracking-wider">
        Proximity Active
      </span>
    </div>
  );
}
