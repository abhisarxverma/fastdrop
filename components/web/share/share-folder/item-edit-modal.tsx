"use client";

import { useEffect, useState } from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import { FolderShareFormValues } from "@/schemas/share/folder-share";
import { ShareDialog } from "../share-dialog";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import RichTextEditor from "../rich-text-editor";
import { CodeEditor } from "../code-editor";

import { FileDropzone } from "../file-dropzone";
import { UploadedFileCard } from "../uploaded-file-card";

import { getExtension, removeExtension } from "@/lib/utils/file-share";
import { fileTypes } from "@/constants/file-type-info";

import { FaFile } from "react-icons/fa";
import { LanguageSelector } from "../language-selector";

import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import { fetchMetadata } from "@/actions/share.actions";
import { validateLinkStructure } from "@/lib/utils/link-moderation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

interface Props {
  index: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ItemEditModal({ index, open, onOpenChange }: Props) {
  const {
    control,
    register,
    watch,
    setValue,
    clearErrors,
    setError,
    formState,
  } = useFormContext<FolderShareFormValues>();

  const item = watch(`items.${index}`);

  const linkValue = useWatch({
    control,
    name: `items.${index}.content`,
  });

  const [debouncedLink] = useDebounce(linkValue, 600);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    if (item?.item_type !== "link") return;
    if (!debouncedLink) return;

    let active = true;

    const validate = async () => {
      if (!validateLinkStructure(debouncedLink)) {
        setError(`items.${index}.content`, {
          type: "manual",
          message: "Invalid URL structure",
        });
        return;
      }

      setIsValidating(true);

      const res = await fetchMetadata(debouncedLink);

      if (!active) return;

      setIsValidating(false);

      if (res.status === "ok") {
        clearErrors(`items.${index}.content`);
      } else {
        setError(`items.${index}.content`, {
          type: "manual",
          message: res.message || "Invalid or unsafe link",
        });
      }
    };

    validate();

    return () => {
      active = false;
    };
  }, [debouncedLink, item?.item_type, index, setError, clearErrors]);

  if (!item) return null;

  function handleSave() {
    if (item.item_type === "link") {
      const isInvalid = !linkValue || !!formState.errors.items?.[index];

      if (isValidating){
        toast.error("Please wait, validating your link");
        return;
      }

      if (isInvalid) {
        toast.error("Please provide a valid link before saving.");
        return;
      }
    }

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
                  onChange={(val) => field.onChange(val ?? "")}
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
                    onChange={(val) => field.onChange(val ?? "")}
                  />
                </Field>
              )}
            />
          </>
        )}

        {item.item_type === "link" && (
          <Controller
            control={control}
            name={`items.${index}.content`}
            render={({ field, fieldState }) => {
              const isInvalid = fieldState.invalid;
              const isValid = !isInvalid && field.value && !isValidating;

              return (
                <Field>
                  <FieldLabel>URL</FieldLabel>

                  <div className="relative">
                    <Input
                      {...field}
                      type="url"
                      placeholder="https://example.com"
                      className="pr-10"
                    />

                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {isValidating && (
                        <Loader2 className="size-4 animate-spin text-muted-foreground" />
                      )}
                      {isValid && (
                        <CheckCircle className="size-4 text-green-500" />
                      )}
                      {isInvalid && <XCircle className="size-4 text-red-500" />}
                    </div>
                  </div>

                  {isValid && (
                    <p className="text-xs font-bold text-green-600">
                      Link is valid to share
                    </p>
                  )}

                  {isInvalid && (
                    <p className="text-xs font-bold text-red-600">
                      {fieldState.error?.message ?? "Invalid or unsafe link"}
                    </p>
                  )}

                  {isValidating && (
                    <p className="text-xs font-bold text-blue-600 flex items-center gap-1">
                      <Loader2 className="size-1 animate-spin" /> Validating
                      link
                    </p>
                  )}

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />
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

                    if (!Object.keys(fileTypes).includes(ext)) {
                      toast.error(
                        `Unsupported file type: .${ext.toUpperCase()}`,
                      );
                      return;
                    }

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
                    setValue(`items.${index}.file`, undefined);
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
