"use client";

import { useTransition } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MdCode } from "react-icons/md";
import { ShareDialog } from "./share-dialog";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { unwrapActionResult } from "@/lib/actions/unwrap-result";
import { codeShareAction } from "@/actions/share.actions";
import { codeShareFormSchema } from "@/schemas/share/code-share";
import { LanguageSelector } from "./language-selector";
import { CodeEditor } from "./code-editor";

interface ShareCodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session_id: string;
}

export function ShareCodeModal({
  open,
  onOpenChange,
  session_id,
}: ShareCodeModalProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(codeShareFormSchema),
    defaultValues: {
      title: "",
      content: "",
      language: "javascript",
    },
  });

  const selectedLanguage = useWatch({
    control: form.control,
    name: "language",
  });

  function handleSubmit(data: z.infer<typeof codeShareFormSchema>) {
    const payload = {
      ...data,
      share_type: "single",
      session_id
    };

    startTransition(async () => {
      try {
        const res = await codeShareAction(payload);
        unwrapActionResult(res);
        toast.success("Code shared successfully!");
        onOpenChange(false);
        form.reset();
      } catch (error) {
        console.log("Error in code share modal : ", (error as Error).message);
        toast.error("Something went wrong!");
      }
    });
  }

  return (
    <ShareDialog
      open={open}
      onOpenChange={onOpenChange}
      icon={<MdCode className="size-5" />}
      title="Share Code Snippet"
      description="Share source code or configuration with the session"
      submitLabel="Share snippet"
      isSubmitting={isPending}
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <form className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="uppercase text-xs tracking-wider text-muted-foreground font-semibold">
                  Snippet Title
                </FieldLabel>

                <Input
                  {...field}
                  placeholder="e.g. socket_client.py"
                  className="bg-muted/40"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="language"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="uppercase text-xs tracking-wider text-muted-foreground font-semibold">
                  Language
                </FieldLabel>

                <LanguageSelector
                  value={field.value}
                  onChange={field.onChange}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel className="uppercase text-xs tracking-wider text-muted-foreground font-semibold">
                Code
              </FieldLabel>

              <div className="rounded-xl border bg-muted/30 transition">
                <CodeEditor
                          value={field.value}
                          onChange={field.onChange}
                          language={selectedLanguage}
                      />
              </div>

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </form>
    </ShareDialog>
  );
}
