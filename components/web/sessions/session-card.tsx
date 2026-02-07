import { Button } from "@/components/ui/button";
import { SessionWithShares } from "@/types/sessions";
import { PrivateBadge } from "../reusables/private-badge";
import { PublicBadge } from "../reusables/public-badge";
import { MdLocationOn } from "react-icons/md";

export function SessionCard({ session }: { session: SessionWithShares }) {
  const isPrivate = session.requires_code;

  return (
    <div className="group flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-sm border-[1.3px] bg-card/80 p-4 sm:p-5 hover:border-primary/50 transition">
      {/* Left side */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <h3 className="font-semibold text-base sm:text-lg truncate">
            { session.title }
          </h3>

          {isPrivate ? <PrivateBadge /> : <PublicBadge />}
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm md:text-md text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-primary" /> Active now
          </span>
          <span className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4" /> {session.distance_meters}m away
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
      >
        Join session
      </Button>
    </div>
  );
}
