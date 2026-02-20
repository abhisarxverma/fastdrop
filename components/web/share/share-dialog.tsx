"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactNode } from "react";
import { LucideLoader2 } from "lucide-react";

interface ShareDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    icon: ReactNode;
    title: string;
    description?: string;
    children: ReactNode;
    submitLabel: string;
    onSubmit: () => void;
    isSubmitting?: boolean;
}

export function ShareDialog({
    open,
    onOpenChange,
    icon,
    title,
    description,
    children,
    submitLabel,
    onSubmit,
    isSubmitting,
}: ShareDialogProps) {
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
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                {icon}
                            </div>

                            <div>
                                <DialogTitle className="text-lg font-semibold">
                                    {title}
                                </DialogTitle>
                                {description && (
                                    <DialogDescription className="text-xs text-muted-foreground mt-1">
                                        {description}
                                    </DialogDescription>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                <ScrollArea
                    className="
            px-6 py-6
            max-h-[65vh]
            space-y-6
          "
                >
                    {children}
                </ScrollArea>

                <div className="px-6 py-5 border-t bg-muted/40 flex items-center justify-between">
                    <p className="hidden lg:block text-[11px] text-muted-foreground font-medium">
                        Shared content will appear quickly to nearby users
                    </p>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            disabled={isSubmitting}
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            onClick={onSubmit}
                            disabled={isSubmitting}
                            className="px-6"
                        >
                            {isSubmitting ? <LucideLoader2 className="animate-spin" /> : submitLabel}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
