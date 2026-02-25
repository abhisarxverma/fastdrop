"use client";

import { useFormContext, Controller } from "react-hook-form";
import { FolderShareFormValues } from "@/schemas/share/folder-share";
import { ShareDialog } from "../share-dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import RichTextEditor from "../rich-text-editor";
import { CodeEditor } from "../code-editor";

import { FileDropzone } from "../file-dropzone";
import { UploadedFileCard } from "../uploaded-file-card";

import { getExtension, removeExtension } from "@/lib/utils/file-share";
import { FaFile } from "react-icons/fa";
import { LanguageSelector } from "../language-selector";

interface Props {
  index: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ItemEditModal({ index, open, onOpenChange }: Props) {
  const { control, register, watch, setValue } =
    useFormContext<FolderShareFormValues>();

  const item = watch(`items.${index}`);

  if (!item) return null;

  function handleSave() {
    onOpenChange(false);
  }

  return (
    <ShareDialog
      icon={<FaFile className="size-5" />}
      open={open}
      onOpenChange={onOpenChange}
      title={`Edit ${item.item_type}`}
      submitLabel="Save"
      onSubmit={handleSave}
    >
      <div className="space-y-6">
        <Field>
          <FieldLabel>Title</FieldLabel>
          <Input
            {...register(`items.${index}.title`)}
            placeholder="Enter title"
          />
        </Field>

        {item.item_type === "text" && (
          <Controller
            control={control}
            name={`items.${index}.content`}
            render={({ field }) => (
              <Field>
                <FieldLabel>Content</FieldLabel>
                <RichTextEditor
                  value={field.value ?? ""}
                  onChange={field.onChange}
                />
              </Field>
            )}
          />
        )}

        {item.item_type === "code" && (
          <>
            <Controller
              control={control}
              name={`items.${index}.language`}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Language</FieldLabel>
                  <LanguageSelector
                    value={field.value}
                    onChange={field.onChange}
                  />
                </Field>
              )}
            />

            <Controller
              control={control}
              name={`items.${index}.content`}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Code</FieldLabel>
                  <CodeEditor
                    language={watch(`items.${index}.language`)}
                    value={field.value ?? ""}
                    onChange={field.onChange}
                  />
                </Field>
              )}
            />
          </>
        )}

        {item.item_type === "link" && (
          <Field>
            <FieldLabel>URL</FieldLabel>
            <Input
              {...register(`items.${index}.content`)}
              placeholder="https://example.com"
            />
          </Field>
        )}

        {item.item_type === "file" && (
          <>
            {!item.file ? (
              <Field>
                <FieldLabel>Upload File</FieldLabel>
                <FileDropzone
                  onChange={(files) => {
                    const file = files[0];
                    if (!file) return;

                    const ext = getExtension(file.name);

                    setValue(`items.${index}.file`, file, {
                      shouldValidate: true,
                    });

                    setValue(`items.${index}.file_name`, file.name, {
                      shouldValidate: true,
                    });

                    setValue(`items.${index}.file_type`, ext, {
                      shouldValidate: true,
                    });

                    if (!item.title) {
                      setValue(`items.${index}.title`, file.name);
                    }
                  }}
                />
              </Field>
            ) : (
              <Field>
                <FieldLabel>Uploaded File</FieldLabel>
                <UploadedFileCard
                  file={item.file}
                  fileName={removeExtension(item.file_name)}
                  fileType={item.file_type}
                  onRemove={() => {
                    setValue(`items.${index}.file`, null);
                    setValue(`items.${index}.file_name`, "");
                    setValue(`items.${index}.file_type`, "");
                  }}
                  onRename={(newName) => {
                    setValue(`items.${index}.file_name`, newName, {
                      shouldValidate: true,
                    });
                  }}
                />
              </Field>
            )}
          </>
        )}
      </div>
    </ShareDialog>
  );
}
