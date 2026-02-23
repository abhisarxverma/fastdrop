import { UseFieldArrayAppend } from "react-hook-form";
import { FolderShareFormValues } from "@/schemas/share/folder-share";
import { FileDropzone } from "../file-dropzone";

interface FolderUploadBarProps {
  append: UseFieldArrayAppend<FolderShareFormValues, "items">;
}

export function FolderUploadBar({ append }: FolderUploadBarProps) {
  return (
    <div className="rounded-2xl border bg-muted/30 p-4 space-y-3">
      <p className="text-sm font-medium text-muted-foreground">
        Upload entire folder
      </p>

      <FileDropzone
        multiple
        directory
        onChange={(files) => {
          files.forEach((file) => {
            append({
              item_type: "file",
              title: file.name,
              file,
              file_name: file.name,
              file_type: file.name.split(".").pop() ?? "",
              file_path: "",
            });
          });
        }}
      />
    </div>
  );
}