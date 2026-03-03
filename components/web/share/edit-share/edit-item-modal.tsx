"use client";

import { useEffect, useState } from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import { EditShareFormValues } from "@/schemas/share/edit-share";
import { ShareDialog } from "../share-dialog";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import RichTextEditor from "../rich-text-editor";
import { CodeEditor } from "../code-editor";
import { LanguageSelector } from "../language-selector";
import { FileDropzone } from "../file-dropzone";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2, CheckCircle, XCircle } from "lucide-react";
import { FaEdit } from "react-icons/fa";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import { fetchMetadata } from "@/actions/share.actions";
import { validateLinkStructure } from "@/lib/utils/link-moderation";
import { getFileInfo, removeExtension } from "@/lib/utils/file-share";

interface Props {
  index: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditItemModal({ index, open, onOpenChange }: Props) {
  const {
    control,
    register,
    setValue,
    clearErrors,
    setError,
    getFieldState,
    formState,
  } = useFormContext<EditShareFormValues>();

  const item = useWatch({
    control,
    name: `items.${index}`,
  });

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

  const titleError = getFieldState(
    `items.${index}.title`,
    formState
  ).error?.message;

  const contentState = getFieldState(
    `items.${index}.content`,
    formState
  );

  const fileError =
    getFieldState(`items.${index}.file`, formState).error?.message ||
    getFieldState(`items.${index}.file_path`, formState).error?.message;

  function handleSave() {
    if (item.item_type === "link") {
      if (isValidating) {
        toast.error("Please wait, validating your link");
        return;
      }

      if (!linkValue || contentState.invalid) {
        toast.error("Please provide a valid link before saving.");
        return;
      }
    }

    if (item.item_type === "file") {
      if (!item.file && !item.file_path) {
        toast.error("Please upload a file before saving.");
        return;
      }
    }

    onOpenChange(false);
  }

  const fileMeta =
    item.item_type === "file" && item.file_type
      ? getFileInfo(item.file_type)
      : null;

  return (
    <ShareDialog
      icon={<FaEdit className="size-5" />}
      open={open}
      onOpenChange={onOpenChange}
      title={`Edit ${item.item_type}`}
      submitLabel="Done"
      onSubmit={handleSave}
    >
      <div className="space-y-6">
        <Field>
          <FieldLabel>Title</FieldLabel>
          <Input {...register(`items.${index}.title`)} />
          {titleError && (
            <p className="text-sm text-destructive">{titleError}</p>
          )}
        </Field>

        {item.item_type === "text" && (
          <Controller
            control={control}
            name={`items.${index}.content`}
            render={({ field }) => (
              <RichTextEditor
                value={field.value ?? ""}
                onChange={(val) => field.onChange(val ?? "")}
              />
            )}
          />
        )}

        {item.item_type === "code" && (
          <>
            <Controller
              control={control}
              name={`items.${index}.language`}
              render={({ field }) => (
                <LanguageSelector
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              control={control}
              name={`items.${index}.content`}
              render={({ field }) => (
                <CodeEditor
                  language={item.language}
                  value={field.value ?? ""}
                  onChange={(val) => field.onChange(val ?? "")}
                />
              )}
            />
          </>
        )}

        {item.item_type === "link" && (
          <Controller
            control={control}
            name={`items.${index}.content`}
            render={({ field }) => {
              const isInvalid = contentState.invalid;
              const isValid =
                !isInvalid && field.value && !isValidating;

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
                      {!isValidating && isValid && (
                        <CheckCircle className="size-4 text-green-500" />
                      )}
                      {!isValidating && isInvalid && (
                        <XCircle className="size-4 text-red-500" />
                      )}
                    </div>
                  </div>

                  {!isValidating && isValid && (
                    <p className="text-xs font-bold text-green-600">
                      Link is valid to share
                    </p>
                  )}

                  {!isValidating && isInvalid && (
                    <p className="text-xs font-bold text-red-600">
                      {contentState.error?.message ??
                        "Invalid or unsafe link"}
                    </p>
                  )}

                  {isValidating && (
                    <p className="text-xs font-bold text-blue-600 flex items-center gap-1">
                      <Loader2 className="size-1 animate-spin" />
                      Validating link
                    </p>
                  )}
                </Field>
              );
            }}
          />
        )}

        {item.item_type === "file" && (
          <>
            {!item.file && !item.file_path ? (
              <Field>
                <FieldLabel>Upload File</FieldLabel>
                <FileDropzone
                  onChange={(files) => {
                    const file = files[0];
                    if (!file) return;

                    const ext =
                      file.name.split(".").pop()?.toLowerCase() ?? "";

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
              <div className="flex items-center gap-5 border rounded-2xl bg-background p-6 shadow-sm">
                {fileMeta && (
                  <div className="size-14 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <fileMeta.icon className="size-7" />
                  </div>
                )}

                <div className="flex-1 min-w-0 space-y-2">
                  <p className="font-medium truncate">
                    {removeExtension(item.file_name)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {fileMeta?.name}
                  </p>
                </div>

                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    setValue(`items.${index}.file`, undefined, {
                      shouldValidate: true,
                    });
                    setValue(`items.${index}.file_path`, "", {
                      shouldValidate: true,
                    });
                    setValue(`items.${index}.file_name`, "", {
                      shouldValidate: true,
                    });
                    setValue(`items.${index}.file_type`, "", {
                      shouldValidate: true,
                    });
                  }}
                >
                  <Trash2 className="size-4 text-red-500" />
                </Button>
              </div>
            )}

            {fileError && (
              <p className="text-sm text-destructive">{fileError}</p>
            )}
          </>
        )}
      </div>
    </ShareDialog>
  );
}