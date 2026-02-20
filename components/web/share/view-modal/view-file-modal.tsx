"use client";

import { ShareViewModal } from "./share-view-modal";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { relativeTimeFromNow } from "@/lib/utils/formatters";

interface ViewFileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fileName: string;
  sharedAt: string;
  onDownload?: () => void;
}

export function ViewFileModal({
  open,
  onOpenChange,
  fileName,
  sharedAt,
  onDownload,
}: ViewFileModalProps) {
  return (
    <ShareViewModal
      open={open}
      onOpenChange={onOpenChange}
      title="File Details"
      icon={<FileText className="size-5 text-red-500" />}
      maxWidth="max-w-md"
    >
      <div className="flex flex-col items-center text-center gap-6">
        <div className="size-24 rounded-3xl bg-red-50 flex items-center justify-center">
          <FileText className="size-12 text-red-500" />
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-semibold">
            {title}
          </h3>

          <p className="text-sm text-muted-foreground">
            {fileName} • {relativeTimeFromNow(sharedAt)}
          </p>
        </div>

        <Button
          className="w-full h-11"
          onClick={onDownload}
        >
          <Download className="size-4 mr-2" />
          Download File
        </Button>
      </div>
    </ShareViewModal>
  );
}
