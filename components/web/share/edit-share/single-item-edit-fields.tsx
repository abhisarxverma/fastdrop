"use client";

import { useEffect, useState } from "react";
import { Controller, UseFormReturn, useWatch } from "react-hook-form";
import { useDebounce } from "use-debounce";
import RichTextEditor from "../rich-text-editor";
import { CodeEditor } from "../code-editor";
import { LanguageSelector } from "../language-selector";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { EditShareInput } from "@/schemas/share/edit-share";
import { fetchMetadata } from "@/actions/share.actions";
import { validateLinkStructure } from "@/lib/utils/link-moderation";
import { LinkMetadataResponse } from "@/types/utils";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

interface Props {
  form: UseFormReturn<EditShareInput>;
}

export function SingleItemEditFields({ form }: Props) {
  const item = useWatch({
    control: form.control,
    name: "items.0",
  });

  const linkValue = useWatch({
    control: form.control,
    name: "items.0.content",
  });

  const [debouncedLink] = useDebounce(linkValue, 600);

  const [linkStatus, setLinkStatus] = useState<LinkMetadataResponse | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    if (item?.item_type !== "link") return;

    if (!debouncedLink) {
      Promise.resolve().then(() => setLinkStatus(null));
      return;
    }

    let active = true;

    const validateLink = async () => {
      if (!validateLinkStructure(debouncedLink)) {
        setLinkStatus(null);
        return;
      }

      setIsValidating(true);

      const res = await fetchMetadata(debouncedLink);

      if (!active) return;

      setLinkStatus(res);

      if (res.status === "ok") {
        form.clearErrors("items.0.content");
      } else {
        form.setError("items.0.content", {
          type: "manual",
          message: res.message || "Invalid or unsafe link",
        });
      }

      setIsValidating(false);
    };

    validateLink();

    return () => {
      active = false;
    };
  }, [debouncedLink, item?.item_type, form]);

  if (!item) return null;

  const visualStatus: "idle" | "validating" | "valid" | "invalid" =
    item.item_type !== "link"
      ? "idle"
      : isValidating
        ? "validating"
        : !linkValue
          ? "idle"
          : linkStatus?.status === "ok"
            ? "valid"
            : linkStatus
              ? "invalid"
              : "idle";

  

  return (
    <div className="space-y-6">
      <Field>
        <FieldLabel>Title</FieldLabel>
        <Input {...form.register("title")} />
      </Field>

      {item.item_type === "text" && (
        <Controller
          control={form.control}
          name="items.0.content"
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
            control={form.control}
            name="items.0.language"
            render={({ field }) => (
              <Field>
                <FieldLabel>Language</FieldLabel>
                <LanguageSelector
                  value={field.value ?? "plaintext"}
                  onChange={field.onChange}
                />
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="items.0.content"
            render={({ field }) => (
              <CodeEditor
                language={form.watch("items.0.language") ?? "plaintext"}
                value={field.value ?? ""}
                onChange={(val) => field.onChange(val ?? "")}
              />
            )}
          />
        </>
      )}

      {item.item_type === "link" && (
        <Controller
          control={form.control}
          name="items.0.content"
          render={({ field, fieldState }) => (
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
                  {visualStatus === "validating" && (
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                  )}

                  {visualStatus === "valid" && (
                    <CheckCircle className="size-4 text-green-500" />
                  )}

                  {visualStatus === "invalid" && (
                    <XCircle className="size-4 text-red-500" />
                  )}
                </div>
              </div>

              {visualStatus === "valid" && (
                <p className="text-xs font-bold text-green-600">
                  Link is valid to share
                </p>
              )}

              {visualStatus === "invalid" && (
                <p className="text-xs font-bold text-red-600">
                  Invalid or unsafe link
                </p>
              )}

              {visualStatus === "validating" && (
                <p className="text-xs font-bold text-blue-600 flex items-center gap-1">
                  <Loader2 className="size-1 animate-spin" />
                  Validating link
                </p>
              )}

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      )}
    </div>
  );
}