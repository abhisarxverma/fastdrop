"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  loading?: boolean;
}

export function BanUserConfirmModal({
  open,
  onOpenChange,
  onConfirm,
  loading = false,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl
          [&>button]:hidden">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-red-100 flex items-center justify-center">
              <Ban className="size-5 text-red-600" />
            </div>
            <DialogTitle className="text-base font-semibold">
              Ban this user from from sharing in your session?
            </DialogTitle>
          </div>

          <DialogDescription className="pt-3 text-sm text-muted-foreground leading-relaxed">
            You are about to ban this user from sharing in your session.
            <br />
            <br />
            They will:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>No longer be able to share new content</li>
              <li>Have all existing shares permanently removed</li>
            </ul>
            <div className="mt-3">
              This action can only be reversed manually.
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6 flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading ? "Banning..." : "Confirm Ban"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}