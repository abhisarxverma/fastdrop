"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { IconType } from "react-icons";

interface ShareViewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  icon: IconType;
  title: string;
  description?: string;
  createdAt?: Date | string;
  children: ReactNode;
  footer?: ReactNode;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function ShareViewModal({
  open,
  onOpenChange,
  icon,
  title,
  description,
  createdAt,
  children,
  footer,
}: ShareViewModalProps) {
  const parsedDate =
    typeof createdAt === "string" ? new Date(createdAt) : createdAt;

  const Icon = icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          p-0
          gap-0
          w-[95vw]
          sm:max-w-xl
          lg:max-w-2xl
          xl:max-w-3xl
          rounded-2xl
          border
          overflow-hidden
          [&>button]:hidden
        "
         onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="px-6 py-5 border-b bg-background">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                {<Icon className="text-primary size-5" />}
              </div>

              <div className="min-w-0">
                <DialogTitle className="text-lg font-semibold truncate">
                  {title}
                </DialogTitle>

                {description && (
                  <DialogDescription className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {description}
                  </DialogDescription>
                )}
              </div>
            </div>

            {parsedDate && (
              <div className="hidden sm:flex flex-col items-end shrink-0 text-[11px] text-muted-foreground">
                <span className="uppercase tracking-wide font-medium">
                  Created
                </span>
                <span className="whitespace-nowrap">
                  {formatDate(parsedDate)}
                </span>
              </div>
            )}
          </div>
        </DialogHeader>

        <ScrollArea className="px-6 py-6 max-h-[65vh]">{children}</ScrollArea>

        <div className="px-6 py-5 border-t bg-muted/40 flex items-center justify-between">
          <div className="flex items-center gap-4 ml-auto">
            {footer ? (
              footer
            ) : (
              <Button variant="ghost" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
