"use client";

import { Control, Controller, useFormContext } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { FileDropzone } from "../file-dropzone";
import { UploadedFileCard } from "../uploaded-file-card";
import { FolderShareFormValues } from "@/schemas/share/folder-share";
import { getExtension, removeExtension } from "@/lib/utils/file-share";

interface Props {
  index: number;
  control: Control<FolderShareFormValues>;
}

export function FileItemFields({ index, control }: Props) {
  const { setValue, getValues } = useFormContext<FolderShareFormValues>();

  return (
    <>
      <Controller
        name={`items.${index}.file`}
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>File</FieldLabel>

            {!field.value ? (
              <FileDropzone
                onChange={(files) => {
                  const file = files?.[0];
                  if (!file) return;

                  field.onChange(file);

                  setValue(`items.${index}.file_name`, file.name, {
                    shouldValidate: true,
                  });

                  const ext = getExtension(file.name);

                  setValue(`items.${index}.file_type`, ext, {
                    shouldValidate: true,
                  });
                }}
              />
            ) : (
              <UploadedFileCard
                file={field.value}
                fileName={removeExtension(
                  getValues(`items.${index}.file_name`)
                )}
                fileType={getValues(`items.${index}.file_type`)}
                onRemove={() => {
                  field.onChange(null);
                  setValue(`items.${index}.file_name`, "");
                  setValue(`items.${index}.file_type`, "");
                }}
                onRename={(newName) => {
                  const ext = getValues(`items.${index}.file_type`);
                  setValue(`items.${index}.file_name`, `${newName}.${ext}`);
                }}
              />
            )}

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
    </>
  );
}