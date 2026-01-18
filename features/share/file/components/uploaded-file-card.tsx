"use client";

import getFileInfo from "../../common/file-type-info";
import { Button } from "@/components/ui/button";
import { IconCancel } from "@tabler/icons-react";
import { Field, FieldLabel } from "@/components/ui/field";

type UploadedFileCardProps = {
    file: File;
    fileName: string;
    fileType: string;
    onRemove: () => void;
    onPreview: () => void;
    onRename: (newName: string) => void;
};

export function UploadedFileCard({
    file,
    fileName,
    fileType,
    onRemove,
    onPreview,
    onRename,
}: UploadedFileCardProps) {

    const meta = getFileInfo(fileType);
    const sizeKB = (file.size / 1024).toFixed(1);

    return (
        <div className="bg-input/50 border p-4 flex items-center gap-4">
            <div className="text-3xl md:text-5xl w-20 md:w-30 text-secondary-foreground/50 aspect-square flex flex-col md:flex-row items-center justify-center"><meta.icon /></div>
            <Field>
                <FieldLabel>Filename</FieldLabel>
                <input
                    type="text"
                    value={fileName}
                    onChange={(e) => {
                        onRename(e.target.value);
                    }}
                    className="w-full border px-2 py-1 text-md bg-transparent hover:border-secondary-foreground/50"
                />
                <p className="text-sm text-secondary-foreground/50">
                    {meta.name} • {sizeKB} KB
                </p>
            </Field>
            <div className="flex gap-2">
                <Button
                    type="button"
                    onClick={onPreview}
                    variant="outline"
                >
                    Preview
                </Button>
                <Button
                    type="button"
                    onClick={onRemove}
                    variant="outline"
                >
                    <IconCancel />
                </Button>
            </div>
        </div>
    );
}
