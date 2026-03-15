"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    CalendarDays,
    Hourglass,
    MapPin,
    LogOut,
    Settings,
    Loader,
} from "lucide-react";
import { NearbySession, SessionsRow } from "@/types/sessions";
import { relativeTimeFromNow } from "@/lib/utils/formatters";
import Container from "@/components/layouts/container";
import Ping from "../reusables/ping";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { EditSessionDialog } from "../sessions/edit-session-dialog";

interface SessionHeaderProps {
    sessionDetails: NearbySession;
    isHost: boolean;
    onLeave: () => void;
    onUpdate: (updated: SessionsRow) => void;
    endingSession: boolean;
    sessionCode?: string;
}

export function SessionHeader({
    sessionDetails,
    isHost,
    onLeave,
    onUpdate,
    endingSession,
    sessionCode
}: SessionHeaderProps) {
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
    return (
        <section className="w-full border-b bg-card/60">
            <Container>
                <div className="py-6 flex flex-col gap-6">

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                        <div className="flex flex-col gap-3 lg:max-w-[40%]">

                            <div className="flex flex-wrap items-center gap-3">
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight wrap-break-words truncate">
                                    {sessionDetails.title}
                                </h1>

                                <Badge
                                    variant="secondary"
                                    className="gap-2 shrink-0 px-2.5 py-1 text-[10px] sm:text-xs"
                                >
                                    <Ping color="blue" />
                                    {isHost ? "You are host" : "Active"}
                                </Badge>
                            </div>

                            <div className="flex flex-col gap-2 sm:hidden text-xs text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <CalendarDays className="size-4 opacity-70" />
                                    Created {relativeTimeFromNow(sessionDetails.created_at)}
                                </div>

                                {!isHost && <div className="flex items-center gap-2">
                                    <MapPin className="size-4 opacity-70" />
                                    {sessionDetails.distance_meters}m away
                                </div>}

                                <div className="flex items-center gap-2">
                                    <Hourglass className="size-4 opacity-70" />
                                    Expires {relativeTimeFromNow(sessionDetails.expires_at)}
                                </div>
                            </div>
                        </div>

                        <div className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground flex-wrap">

                            <div className="flex items-center gap-2">
                                <CalendarDays className="size-4 opacity-70" />
                                Created {relativeTimeFromNow(sessionDetails.created_at)}
                            </div>

                            <Separator orientation="vertical" className="h-4" />

                            <div className="flex items-center gap-2">
                                <MapPin className="size-4 opacity-70" />
                                {sessionDetails.distance_meters}m away
                            </div>

                            <Separator orientation="vertical" className="h-4" />

                            <div className="flex items-center gap-2">
                                <Hourglass className="size-4 opacity-70" />
                                Expires {relativeTimeFromNow(sessionDetails.expires_at)}
                            </div>

                            {isHost && <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-9 w-9"
                                        onClick={() => setSettingsOpen(true)}
                                    >
                                        <Settings className="size-4" />
                                    </Button>
                                </TooltipTrigger>

                                <TooltipContent>
                                    Edit session settings
                                </TooltipContent>
                            </Tooltip>}

                            <Button
                                onClick={onLeave}
                                size="sm"
                                disabled={endingSession}
                                className="
                  ml-2
                  gap-2
                  rounded-lg
                  bg-destructive/10
                  text-destructive
                  border border-destructive/30
                  backdrop-blur-sm
                  hover:bg-destructive/20
                  hover:border-destructive/40
                "
                            >
                                <LogOut className="size-4" />
                                {endingSession ? <Loader className="animate-spin" /> : isHost ? "End" : "Leave"}
                            </Button>
                        </div>

                    </div>

                    <div className="sm:hidden flex items-center gap-2">
                        {isHost && <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-9 w-9"
                                    onClick={() => setSettingsOpen(true)}
                                >
                                    <Settings className="size-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Edit session settings
                            </TooltipContent>
                        </Tooltip>}

                        <Button
                            onClick={onLeave}
                            size="sm"
                            disabled={endingSession}
                            className="
                flex-1
                gap-2
                rounded-lg
                bg-destructive/10
                text-destructive
                border border-destructive/30
                backdrop-blur-sm
                hover:bg-destructive/20
              "
                        >
                            <LogOut className="size-4" />
                            {endingSession ? <Loader className="animate-spin" /> : isHost ? "End Session" : "Leave session"}
                        </Button>
                    </div>

                </div>
            </Container>

            <EditSessionDialog
                open={settingsOpen}
                onOpenChange={setSettingsOpen}
                session={sessionDetails}
                onUpdate={onUpdate}
                sessionCode={sessionCode}
            />
        </section>
    );
}
