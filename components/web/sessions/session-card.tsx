import { Button } from "@/components/ui/button";
import { NearbySession } from "@/types/sessions";
import { LockedBadge } from "../reusables/locked-badge";
import { OpenBadge } from "../reusables/open-badge";
import { MdFileUpload, MdLocationOn } from "react-icons/md";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Ping from "../reusables/ping";

type SessionCardView = "rows" | "grid";

interface SessionCardProps {
  session: NearbySession;
  view: SessionCardView;
}

export function SessionCard({ session, view }: SessionCardProps) {
  const isLocked : boolean = session.requires_code;
  const isGrid : boolean = view === "grid";

  return (
    <div
      className={cn(
        "group rounded-sm border-[1.3px] bg-card/80 hover:border-primary/50 transition",
        isGrid
          ? "flex flex-col gap-4 p-4 sm:p-5"
          : "flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 sm:p-5"
      )}
    >
      {/* Content */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3
            className={cn(
              "font-bold truncate",
              isGrid
                ? "text-base sm:text-lg"
                : "text-base sm:text-lg"
            )}
          >
            {session.title}
          </h3>

          {isLocked ? <LockedBadge /> : <OpenBadge />}
        </div>

        <div
          className={cn(
            "flex flex-wrap items-center text-muted-foreground",
            isGrid
              ? "gap-2 text-xs"
              : "gap-2 text-xs sm:text-sm"
          )}
        >
          <span className="flex items-center gap-1">
            <Ping color="blue"/>
            Active now
          </span>

          <Separator orientation="vertical"/>

          <span className="flex items-center gap-1">
            <MdLocationOn className="h-3.5 w-3.5" />
            {Math.round(session.distance_meters)}m away
          </span>

          <Separator orientation="vertical"/>

          <span className="flex items-center gap-1">
            <MdFileUpload className="h-3.5 w-3.5" />
            {session.shares_count} shares
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className={cn(isGrid ? "pt-2" : "self-start md:self-center")}>
        <Button
          variant="outline"
          size={isGrid ? "sm" : "sm"}
          className={cn(
            isGrid && "w-full"
          )}
        >
          Join session
        </Button>
      </div>
    </div>
  );
}
