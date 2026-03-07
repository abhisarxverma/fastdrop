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
import { Trash2 } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  shareTitle?: string;
  loading?: boolean;
}

export function DeleteShareConfirmModal({
  open,
  onOpenChange,
  onConfirm,
  shareTitle,
  loading = false,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl
          [&>button]:hidden">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-red-100 flex items-center justify-center">
              <Trash2 className="size-5 text-red-600" />
            </div>
            <DialogTitle className="text-base font-semibold">
              Permanently delete this share?
            </DialogTitle>
          </div>

          <DialogDescription className="pt-3 text-sm text-muted-foreground leading-relaxed">
            {shareTitle ? (
              <>
                You are about to permanently delete{" "}
                <span className="font-medium text-foreground">
                  “{shareTitle}”
                </span>
                . This action cannot be undone.
              </>
            ) : (
              <>
                This share will be permanently removed. This action cannot be
                undone.
              </>
            )}
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
            {loading ? "Deleting..." : "Delete permanently"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}