"use client";

import { ShareViewModal } from "./share-view-modal";
import { Button } from "@/components/ui/button";
import { copy } from "@/lib/utils";
import { Link as LinkIcon, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface ViewLinkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  url: string;
  createdAt?: string;
  onOpen: () => void;
}

export function ViewLinkModal({
  open,
  onOpenChange,
  title,
  url,
  createdAt,
  onOpen,
}: ViewLinkModalProps) {

  function handleOpen() {
    try {
      onOpen();
    } catch (e) {
      toast.error((e as Error).message);
      console.log("Link opening failed: ", e);
    }
  }

  async function handleCopy() {
    try {
      await copy(url)
      toast.success("Link copied successfully");
    } catch (e) {
      toast.error((e as Error).message);
      console.log("Code copy failed: ", e);
    }
  }

  return (
    <ShareViewModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      createdAt={createdAt}
      icon={LinkIcon}
      footer={
        <>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Close
          </Button>

          <Button onClick={handleOpen}>
            Open Link
            <ExternalLink className="size-4 ml-2" />
          </Button>
        </>
      }
    >
      <div className="rounded-xl border p-4 bg-background flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground break-all">{url}</p>

        <Button size="icon" variant="ghost" onClick={handleCopy}>
          <Copy className="size-4" />
        </Button>
      </div>
    </ShareViewModal>
  );
}