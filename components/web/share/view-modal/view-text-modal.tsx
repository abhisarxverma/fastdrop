"use client";

import { ShareViewModal } from "./share-view-modal";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { ReactNode } from "react";
import { BsFileEarmarkText } from "react-icons/bs";

interface ViewTextModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  createdAt?: string;
  children: ReactNode;
  onCopy?: () => void;
}

export function ViewTextModal({
  open,
  onOpenChange,
  title,
  description,
  createdAt,
  children,
  onCopy,
}: ViewTextModalProps) {
  return (
    <ShareViewModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      createdAt={createdAt}
      icon={BsFileEarmarkText}
      footer={
        <>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
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