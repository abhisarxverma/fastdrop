"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import { ValidateSessionCodeFormSchema } from "@/schemas/sessions/validate-session-code";
import z from "zod";
import { toast } from "sonner";

interface EnterSessionCodeModalProps {
  onSubmit: (data: { code: string }) => Promise<void> | void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EnterSessionCodeModal({
  onSubmit,
  open = true,
  onOpenChange,
}: EnterSessionCodeModalProps) {
  const form = useForm({
    resolver: zodResolver(ValidateSessionCodeFormSchema),
    defaultValues: {
      code: "",
    },
  });

  const handleSubmit = form.handleSubmit(
    async (values: z.infer<typeof ValidateSessionCodeFormSchema>) => {
      try {
        await onSubmit({ code: values.code });
      } catch (err) {
        console.error(err);
        toast.error((err as Error).message);
      }
    }
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-[400px] ${onOpenChange ? "" : "[&>button]:hidden"}`}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <KeyRound className="size-6 text-primary" />
            Enter session code
          </DialogTitle>
          <DialogDescription>
            Please enter the 6‑digit session code to continue.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 items-center"
        >
          <Field className="w-full">
            <FieldLabel>Session Code</FieldLabel>
            <Input
              {...form.register("code")}
              maxLength={6}
              placeholder="••••••"
              className="text-center tracking-widest text-2xl font-mono font-bold h-14 bg-muted/40 focus-visible:ring-primary/20"
              aria-invalid={!!form.formState.errors.code}
            />
            {form.formState.errors.code && (
              <FieldError errors={[form.formState.errors.code]} />
            )}
          </Field>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin size-4" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
