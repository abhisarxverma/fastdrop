"use client";

import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import z from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import RadiusSelector from "./radius-selector";

import { editSessionAction } from "@/actions/sessions.actions";
import { unwrapActionResult } from "@/lib/actions/unwrap-result";
import { toast } from "sonner";

import { formatDateForInput } from "@/lib/utils/formatters";
import { getExpiryLimits } from "@/lib/utils/date-limits";

import { editSessionFormSchema } from "@/schemas/sessions/edit-session";
import { NearbySession, SessionsRow } from "@/types/sessions";

export type RadiusSelectType = 10 | 30 | 60 | 100 | 150;

interface EditSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: NearbySession;
  onUpdate: (updated: SessionsRow) => void;
}

export function EditSessionDialog({
  open,
  onOpenChange,
  session,
  onUpdate
}: EditSessionDialogProps) {
  const [isPending, startTransition] = useTransition();

  const { min, max } = getExpiryLimits();

  const form = useForm<z.infer<typeof editSessionFormSchema>>({
    resolver: zodResolver(editSessionFormSchema),
    defaultValues: {
      title: session.title,
      expires_at: formatDateForInput(new Date(session.expires_at)),
      sharing_enabled: session.sharing_enabled,
      radius_meters: session.radius_meters as RadiusSelectType,
      requires_code: false
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      try {
        const response = await editSessionAction({
          session_id: session.id,
          ...values,
        });

        const data: SessionsRow = unwrapActionResult(response);

        onUpdate(data);

        toast.success("Session updated successfully");

        onOpenChange(false);
      } catch (err) {
        toast.error((err as Error).message);
      }
    });
  });

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="w-full max-w-[480px] p-0"
      >
        <ScrollArea className="max-h-[calc(100vh-4rem)]">
          <form onSubmit={onSubmit}>
            <DialogHeader className="px-4 md:px-8 pt-4 md:pt-8">
              <DialogTitle className="text-2xl font-bold tracking-tight">
                Edit session
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                Update your session settings and sharing controls.
              </p>
            </DialogHeader>

            <div className="px-4 md:px-8 py-4 flex flex-col gap-6">

              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Session title</FieldLabel>

                    <Input
                      {...field}
                      type="text"
                      placeholder="e.g. Computer Networks Lab"
                      aria-invalid={fieldState.invalid}
                      className="h-12 bg-muted/40 focus-visible:ring-primary/20"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="sharing_enabled"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Participant sharing</FieldLabel>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Allow participants to upload files to this session.
                      </p>

                      <Toggle
                        pressed={field.value}
                        onPressedChange={field.onChange}
                      >
                        {field.value ? "Enabled" : "Disabled"}
                      </Toggle>
                    </div>
                  </Field>
                )}
              />

              <Controller
                name="radius_meters"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Visibility radius</FieldLabel>

                    <RadiusSelector
                      value={field.value as RadiusSelectType}
                      onChange={field.onChange}
                    />

                    <p className="text-xs text-muted-foreground px-1">
                      Controls how far away users can discover this session.
                    </p>
                  </Field>
                )}
              />

              <Controller
                name="expires_at"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Session expiry</FieldLabel>

                    <Input
                      {...field}
                      type="datetime-local"
                      min={formatDateForInput(min)}
                      max={formatDateForInput(max)}
                      aria-invalid={fieldState.invalid}
                      className="h-12 bg-muted/40 focus-visible:ring-primary/20"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}

                    <p className="text-xs text-muted-foreground px-1">
                      Session will automatically end at this time.
                    </p>
                  </Field>
                )}
              />
            </div>

            <div className="px-4 md:px-8 py-4 flex flex-col gap-4">
              <Button size="lg" type="submit" disabled={isPending}>
                {isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save changes
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}