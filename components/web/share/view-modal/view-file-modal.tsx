"use client";

import { ShareViewModal } from "./share-view-modal";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { relativeTimeFromNow } from "@/lib/utils/formatters";
import { IconType } from "react-icons";
import { toast } from "sonner";

interface ViewFileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  fileName: string;
  createdAt?: string;
  onDownload: () => void;
  FileIcon: IconType;
  description: string;
}

export function ViewFileModal({
  open,
  onOpenChange,
  title,
  fileName,
  createdAt,
  onDownload,
  FileIcon,
  description,
}: ViewFileModalProps) {

  function handleDownload() {
    try {
      onDownload();
      toast.success("File downloaded successfully");
    } catch (e) {
      toast.error((e as Error).message);
      console.log("Download Failed: ", e);
    }
  }

  return (
    <ShareViewModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      createdAt={createdAt}
      icon={FileIcon}
      footer={
        <>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button className="" onClick={handleDownload}>
            <Download className="size-4 mr-2" />
            Download File
          </Button>
        </>
      }
    >
      <div className="flex flex-col items-center text-center gap-6 py-6">
        <div className="size-24 rounded-3xl bg-red-50 flex items-center justify-center">
          <FileIcon className="size-12 text-red-500" />
        </div>

        <p className="text-md font-semibold">{fileName}</p>

        <p className="text-sm text-muted-foreground">
          {createdAt ? relativeTimeFromNow(createdAt) : null}
        </p>
      </div>
    </ShareViewModal>
  );
}
