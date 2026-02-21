"use client";

import { ShareViewModal } from "./share-view-modal";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { ReactNode } from "react";

interface ViewCodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  createdAt?: string;
  children: ReactNode;
  onCopy?: () => void;
  languageIcon?: ReactNode;
}

export function ViewCodeModal({
  open,
  onOpenChange,
  title,
  description,
  createdAt,
  children,
  onCopy,
  languageIcon,
}: ViewCodeModalProps) {
  return (
    <ShareViewModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      icon={languageIcon}
      createdAt={createdAt}
      footer={
        <>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
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