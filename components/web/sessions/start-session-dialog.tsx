"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Globe, Lock } from "lucide-react";
import RadiusSelector from "./radius-selector";

export type RadiusSelectType = 10 | 30 | 60 | 100 | 150;

interface StartSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StartSessionDialog({
  open,
  onOpenChange,
}: StartSessionDialogProps) {
  const [visibility, setVisibility] = useState<"open" | "locked">("open");
  const [radius, setRadius] = useState<RadiusSelectType>(30);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[480px] min-w-[330px] p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-4 md:px-8 pt-4 md:pt-8">
          <DialogTitle className="text-2xl font-bold tracking-tight">
            Start a new session
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Create a secure space to share files with people nearby.
          </p>
        </DialogHeader>

        {/* Body */}
        <div className="px-4 md:px-8 py-4 flex flex-col gap-6">
          {/* Session title */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Session Title</Label>
            <Input
              id="title"
              placeholder="e.g. Design Sync"
              className="h-12 bg-muted/40 focus-visible:ring-primary/20"
            />
          </div>

          {/* Visibility */}
          <div className="flex flex-col gap-2">
            <Label>Visibility</Label>

            <div className="flex rounded-xl h-[52px] bg-muted p-1.5 border">
              <Button
              variant="ghost"
                onClick={() => setVisibility("open")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition",
                  visibility === "open"
                    ? "bg-background shadow-sm text-primary"
                    : "text-muted-foreground"
                )}
              >
                <Globe className="h-4 w-4" />
                Open
              </Button>

              <Button
              variant="ghost"
                onClick={() => setVisibility("locked")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition",
                  visibility === "locked"
                    ? "bg-background shadow-sm text-yellow-700"
                    : "text-muted-foreground"
                )}
              >
                <Lock className="h-4 w-4" />
                Locked
              </Button>
            </div>

            {visibility === "open" ? (
              <p className="text-xs text-muted-foreground px-1">
                Anyone nearby can join and view content instantly.
              </p>
            ) : (
              <p className="text-xs text-muted-foreground px-1">
                Requires a secure entry code for participants to join.
              </p>
            )}
          </div>

          <RadiusSelector value={radius} onChange={setRadius} />

          {/* Expiry */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="expiry">Session Expiry</Label>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Optional
              </span>
            </div>

            <Input
              id="expiry"
              type="datetime-local"
              className="h-12 bg-muted/40 focus-visible:ring-primary/20"
            />

            <p className="text-xs text-muted-foreground px-1">
              Defaults to 1 hour if left empty.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 md:px-8 py-4 flex flex-col gap-4">
          <Button size="lg" className="">
            Start session
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
