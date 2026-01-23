"use client";

import { Button } from "@/components/ui/button";
import { IconCancel } from "@tabler/icons-react";
import { Field, FieldLabel } from "@/components/ui/field";
import { getFileInfo } from "../../common/utils";
import FileNameInput from "../../common/components/filename-input";

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
    const sizeKB = (file.size / 1024 / 1024).toFixed(1);

    return (
        <div className="bg-input/50 border p-4 flex items-center gap-4">
            <div className="text-3xl md:text-5xl w-20 md:w-30 text-primary/50 aspect-square flex flex-col md:flex-row items-center justify-center"><meta.icon /></div>
            <Field>
                <FieldLabel>Filename</FieldLabel>
                <FileNameInput
                    value={fileName}
                    onChange={(name) => {
                        onRename(name);
                    }}
                extension={fileType}
                />
                <p className="text-sm text-secondary-foreground/50">
                    {meta.name} • {sizeKB} MB
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
