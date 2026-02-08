import Container from "@/components/layouts/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { relativeTimeFromNow } from "@/lib/utils/formatters";
import { Session } from "@/types/sessions";
import { MdSchedule } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Ping from "../reusables/ping";

interface ActiveSessionOfUserProps {
  session: Session;
  onEnter: () => void;
  onEnd?: () => void;
}

export function ActiveSessionOfUserBanner({
  session,
  onEnter,
  onEnd,
}: ActiveSessionOfUserProps) {
  return (
    <section className="w-full bg-muted/30">
      <Container className="py-5 sm:py-8 md:py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Left */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Your Active Session
            </span>

            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl text-foreground">
                {session.title}
              </h1>
              <Ping color="green" />
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-sm text-muted-foreground">

              <span className="flex items-center gap-1.5">
                <MdSchedule className="h-4 w-4" />
                Started {relativeTimeFromNow(session.created_at)}
              </span>

              <span className="flex items-center gap-1.5">
                <RiDeleteBin6Fill className="h-4 w-4" />
                Expiry {relativeTimeFromNow(session.expires_at)}
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="shrink-0">
            <Button
              variant="outline"
              className="border-destructive/40 text-destructive hover:bg-destructive/10"
              onClick={onEnd}
            >
              End Session
            </Button>
          </div>
        </div>
      </Container>
      <Separator />
    </section>
  );
}
