"use client";

import { ShareViewModal } from "./share-view-modal";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { ReactNode } from "react";
import { BsFileEarmarkText } from "react-icons/bs";
import { toast } from "sonner";

interface ViewTextModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  createdAt?: string;
  children: ReactNode;
  onCopy: () => void;
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

  function handleCopy() {
    try {
      onCopy();
      toast.success("Text copied successfully");
    } catch (e) {
      toast.error((e as Error).message);
      console.log("Text copy failed: ", e);
    }
  }

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

          <Button onClick={handleCopy}>
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