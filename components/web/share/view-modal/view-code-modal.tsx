"use client";

import { ShareViewModal } from "./share-view-modal";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { ReactNode } from "react";

interface ViewCodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string
  meta?: string;
  children: ReactNode;
  onCopy?: () => void;
  sharedAt: string
  LanguageIcon: ReactNode
}

export function ViewCodeModal({
  open,
  onOpenChange,
  title,
  description,
  meta,
  children,
  onCopy,
  sharedAt,
  LanguageIcon
}: ViewCodeModalProps) {
  return (
    <ShareViewModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      subtitle={meta}
      description={description}
      Icon={LanguageIcon}
      maxWidth="max-w-3xl"
      sharedAt={sharedAt}
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
            Copy Code
          </Button>
        </>
      }
    >
      <div className="rounded-xl border bg-background overflow-hidden">
        {children}
      </div>
    </ShareViewModal>
  );
}
