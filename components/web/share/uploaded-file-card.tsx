"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { getFileInfo } from "@/lib/utils/file-share";
import {FileNameInput} from "./filename-input";

type UploadedFileCardProps = {
  file: File;
  fileName: string;
  fileType: string;
  onRemove: () => void;
  onRename: (newName: string) => void;
};

export function UploadedFileCard({
  file,
  fileName,
  fileType,
  onRemove,
  onRename,
}: UploadedFileCardProps) {
  const meta = getFileInfo(fileType);
  const sizeMB = (file.size / 1024 / 1024).toFixed(1);

  return (
    <div className="flex items-center gap-5 border rounded-2xl bg-background p-6 shadow-sm">
      <div className="size-14 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
        <meta.icon className="size-7" />
      </div>

      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center">
          <div className="flex-1">
            <FileNameInput
              value={fileName}
              onChange={onRename}
              extension={fileType}
            />
          </div>

          <div className="ml-2 px-2 py-1 rounded-md bg-muted text-xs font-medium text-muted-foreground select-none">
            .{fileType}
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          {meta.name} • {sizeMB} MB
        </p>
      </div>

      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={onRemove}
        className="rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}
