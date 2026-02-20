"use client";

import { ShareViewModal } from "./share-view-modal";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { ReactNode } from "react";

interface ViewTextModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  meta?: string;
  children: ReactNode; // your read-only rich editor
  onCopy?: () => void;
}

export function ViewTextModal({
  open,
  onOpenChange,
  title,
  meta,
  children,
  onCopy,
}: ViewTextModalProps) {
  return (
    <ShareViewModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      subtitle={meta}
      icon={<Copy className="size-5 text-amber-600" />}
      footer={
        <>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>

          <Button onClick={onCopy}>
            <Copy className="size-4 mr-2" />
            Copy Text
          </Button>
        </>
      }
    >
      <div className="prose prose-sm max-w-none">
        {children}
      </div>
    </ShareViewModal>
  );
}
