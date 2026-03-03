"use client";

import { useEffect, useState, useTransition } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import { Link as LinkIcon } from "lucide-react";
import { ShareDialog } from "./share-dialog";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LinkPreviewCard } from "./link-preview-card";
import { linkShareFormSchema } from "@/schemas/share/link-share";
import { linkShareAction, fetchMetadata } from "@/actions/share.actions";
import { validateLinkStructure } from "@/lib/utils/link-moderation";
import { LinkMetadataResponse } from "@/types/utils";
import { unwrapActionResult } from "@/lib/actions/unwrap-result";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

interface ShareLinkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session_id: string;
}

export function ShareLinkModal({
  open,
  onOpenChange,
  session_id,
}: ShareLinkModalProps) {
  const [isPending, startTransition] = useTransition();
  const [linkStatus, setLinkStatus] = useState<LinkMetadataResponse | null>(
    null,
  );
  const [isValidating, setIsValidating] = useState(false);

  const form = useForm({
    resolver: zodResolver(linkShareFormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const content = useWatch({
    control: form.control,
    name: "content",
  });

  const [debouncedContent] = useDebounce(content, 600);

  useEffect(() => {
    if (!debouncedContent) {
      Promise.resolve().then(() => setLinkStatus(null));
      return;
    }

    let active = true;

    const validateLink = async () => {
      if (!validateLinkStructure(debouncedContent)) {
        setLinkStatus(null);
        return;
      };

      setIsValidating(true);

      const res = await fetchMetadata(debouncedContent);

      if (!active) return;

      setLinkStatus(res);

      if (res.status === "ok") {
        form.clearErrors("content");
      } else {
        form.setError("content", {
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
  }, [debouncedContent, form]);

  const visualStatus: "idle" | "validating" | "valid" | "invalid" = isValidating
    ? "validating"
    : !content
      ? "idle"
      : linkStatus?.status === "ok"
        ? "valid"
        : linkStatus
          ? "invalid"
          : "idle";

  async function handleSubmit(data: z.infer<typeof linkShareFormSchema>) {
    if (visualStatus === "validating") {
      toast.error("Validating your link, Please wait.");
      return;
    }

    if (!linkStatus || linkStatus.status !== "ok") {
      toast.error("Please provide a valid link");
      return;
    }

    const payload = {
      ...data,
      session_id,
      share_type: "single",
    };

    startTransition(async () => {
      try {
        const res = await linkShareAction(payload);
        unwrapActionResult(res);

        toast.success("Link shared successfully");

        form.reset({
          title: "",
          content: "",
        });

        setLinkStatus(null);
        onOpenChange(false);
      } catch (error) {
        console.log("Error in share link submit : ", error);
        toast.error((error as Error).message || "Failed to share link");
      }
    });
  }

  return (
    <ShareDialog
      open={open}
      onOpenChange={onOpenChange}
      icon={<LinkIcon className="size-5" />}
      title="Share Link"
      description="Share a website or external resource"
      submitLabel="Share link"
      isSubmitting={isPending}
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <form className="space-y-6">
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel className="uppercase text-xs tracking-wider text-muted-foreground font-semibold">
                Title
              </FieldLabel>

              <Input
                {...field}
                placeholder="e.g. Documentation, Reference Guide"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel className="uppercase text-xs tracking-wider text-muted-foreground font-semibold">
                URL
              </FieldLabel>

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
                  <Loader2 className="size-1 animate-spin" /> Validating link
                </p>
              )}

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="space-y-2">
          <FieldLabel className="uppercase text-xs tracking-wider text-muted-foreground font-semibold">
            Link Preview
          </FieldLabel>

          <LinkPreviewCard response={linkStatus} isValidating={isValidating} />
        </div>
      </form>
    </ShareDialog>
  );
}
