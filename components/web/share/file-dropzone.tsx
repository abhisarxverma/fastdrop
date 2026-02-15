"use client";

import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { Upload } from "lucide-react";

type FileDropzoneProps = {
  onChange: (file: File | null) => void;
};

export function FileDropzone({ onChange }: FileDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onChange(acceptedFiles[0]);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    multiple: false,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative flex flex-col items-center justify-center
        border-2 border-dashed rounded-2xl
        bg-muted/40
        py-14 px-6
        transition-all
        ${isDragActive ? "border-primary bg-muted/60" : "border-border"}
        hover:border-primary/60 cursor-pointer
      `}
      onClick={open}
    >
      <input {...getInputProps()} />

      <div className="size-14 rounded-full bg-background border flex items-center justify-center mb-4 text-muted-foreground transition-colors group-hover:text-primary">
        <Upload className="size-6" />
      </div>

      <div className="text-center space-y-1">
        <p className="text-sm font-semibold">
          Drag & drop file here or{" "}
          <span className="text-primary">click to browse</span>
        </p>
        <p className="text-xs text-muted-foreground">
          Maximum file size: 200 MB
        </p>
      </div>
    </div>
  );
}
