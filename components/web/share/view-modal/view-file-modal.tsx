"use client";

import { ShareViewModal } from "./share-view-modal";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { relativeTimeFromNow } from "@/lib/utils/formatters";

interface ViewFileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  fileName: string;
  createdAt?: string;
  onDownload?: () => void;
}

export function ViewFileModal({
  open,
  onOpenChange,
  title,
  fileName,
  createdAt,
  onDownload,
}: ViewFileModalProps) {
  return (
    <ShareViewModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={fileName}
      createdAt={createdAt}
      icon={<FileText className="size-5 text-red-500" />}
      footer={
        <Button className="w-full h-11" onClick={onDownload}>
          <Download className="size-4 mr-2" />
          Download File
        </Button>
      }
    >
      <div className="flex flex-col items-center text-center gap-6 py-6">
        <div className="size-24 rounded-3xl bg-red-50 flex items-center justify-center">
          <FileText className="size-12 text-red-500" />
        </div>

        <p className="text-sm text-muted-foreground">
          {createdAt ? relativeTimeFromNow(createdAt) : null}
        </p>
      </div>
    </ShareViewModal>
  );
}