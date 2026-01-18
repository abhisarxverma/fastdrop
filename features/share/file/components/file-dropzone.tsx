"use client";

import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { FaUpload } from "react-icons/fa";
import { Button } from "@/components/ui/button";

type FileDropzoneProps = {
  value?: File | null;
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

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    multiple: false,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed rounded-md p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition bg-card"
    >
      <input {...getInputProps()} />
      <FaUpload className="text-3xl mb-3 text-primary" />
      <p className="text-sm">Drag & drop a file here, or</p>
      <Button
        type="button"
        onClick={open}
        variant="secondary"
        className="mt-4"
      >
        Upload
      </Button>
    </div>
  );
}
