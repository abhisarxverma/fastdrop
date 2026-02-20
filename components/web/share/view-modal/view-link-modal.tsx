"use client";

import { ShareViewModal } from "./share-view-modal";
import { Button } from "@/components/ui/button";
import { Link as LinkIcon, Copy, ExternalLink } from "lucide-react";

interface ViewLinkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  url: string;
  onCopy?: () => void;
}

export function ViewLinkModal({
  open,
  onOpenChange,
  title,
  url,
  onCopy,
}: ViewLinkModalProps) {
  return (
    <ShareViewModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      icon={<LinkIcon className="size-5 text-blue-500" />}
      maxWidth="max-w-xl"
      footer={
        <>
          <Button variant="ghost" onClick={onOpenChange.bind(null, false)}>
            Cancel
          </Button>

          <Button onClick={() => window.open(url, "_blank")}>
            Open Link
            <ExternalLink className="size-4 ml-2" />
          </Button>
        </>
      }
    >
      <div className="rounded-xl border p-4 bg-background flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground break-all">
          {url}
        </p>

        <Button size="icon" variant="ghost" onClick={onCopy}>
          <Copy className="size-4" />
        </Button>
      </div>
    </ShareViewModal>
  );
}
