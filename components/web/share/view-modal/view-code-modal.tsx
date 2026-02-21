"use client";

import { ShareViewModal } from "./share-view-modal";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { ReactNode } from "react";
import { IconType } from "react-icons";

interface ViewCodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  createdAt?: string;
  children: ReactNode;
  onCopy?: () => void;
  LanguageIcon: IconType;
}

export function ViewCodeModal({
  open,
  onOpenChange,
  title,
  description,
  createdAt,
  children,
  onCopy,
  LanguageIcon,
}: ViewCodeModalProps) {
  return (
    <ShareViewModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      icon={LanguageIcon}
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