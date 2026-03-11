"use client";

import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Loader2 } from "lucide-react";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import RadiusSelector from "./radius-selector";
import { VisibilityToggle } from "./visibility-toggle";

import { createSessionFormSchema } from "@/schemas/sessions/create-session.schema";
import { formatDateForInput, getDefaultExpiry } from "@/lib/utils/formatters";
import { useGeo } from "@/providers/geo-provider";
import { toast } from "sonner";
import { getExpiryLimits } from "@/lib/utils/date-limits";
import { createSessionAction } from "@/actions/sessions.actions";
import { unwrapActionResult } from "@/lib/actions/unwrap-result";
import { SessionsRow } from "@/types/sessions";
import { useRouter } from "next/navigation";

export type RadiusSelectType = 10 | 30 | 60 | 100 | 150;

interface StartSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: (createdSession: SessionsRow) => void;
}

export function StartSessionDialog({
  open,
  onOpenChange,
  onCreated
}: StartSessionDialogProps) {
  const [isPending, startTransition] = useTransition();
  const { location } = useGeo();

  const { min, max } = getExpiryLimits();

  const router = useRouter()

  const form = useForm<z.infer<typeof createSessionFormSchema>>({
    resolver: zodResolver(createSessionFormSchema),
    defaultValues: {
      title: "",
      expires_at: formatDateForInput(new Date(getDefaultExpiry())),
      requires_code: false,
      radius_meters: 100,
    },
  });

  const onSubmit = form.handleSubmit((values: z.infer<typeof createSessionFormSchema>) => {
    startTransition(async () => {
        try {
          const response = await createSessionAction({
            ...values,
            lat: location.lat,
            lng: location.lng
          });

          const unwrappedResult = unwrapActionResult(response);
          toast.success("Session created successfully");
          onCreated(unwrappedResult);
          handleCancel();
          router.push(`/web/sessions/${unwrappedResult.id}`)
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
        className="
      w-full max-w-[480px]
      p-0
    "
      >
        <ScrollArea
          className="
        max-h-[calc(100vh-4rem)]
      "
        >
          <form onSubmit={onSubmit}>
            <DialogHeader className="px-4 md:px-8 pt-4 md:pt-8">
              <DialogTitle className="text-2xl font-bold tracking-tight">
                Start a new session
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                Create a secure space to share files with people nearby.
              </p>
            </DialogHeader>

            <div className="px-4 md:px-8 py-4 flex flex-col gap-6">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Session Title</FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      placeholder="e.g. Design Sync"
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
                name="requires_code"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Visibility</FieldLabel>
                    <VisibilityToggle
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <p className="text-xs text-muted-foreground px-1">
                      {field.value
                        ? "Requires a secure entry code for participants to join."
                        : "Anyone nearby can join and view content instantly."}
                    </p>
                  </Field>
                )}
              />

              <Controller
                name="radius_meters"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Session area</FieldLabel>
                    <RadiusSelector
                      value={field.value as RadiusSelectType}
                      onChange={field.onChange}
                    />
                    <p className="text-xs text-muted-foreground px-1">
                      Controls who can discover this session nearby.
                    </p>
                  </Field>
                )}
              />

              <Controller
                name="expires_at"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <div className="flex justify-between items-center">
                      <FieldLabel>Session Expiry</FieldLabel>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Optional
                      </span>
                    </div>
                    <Input
                      {...field}
                      type="datetime-local"
                      min={formatDateForInput(min)}
                      max={formatDateForInput(max)}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      aria-invalid={fieldState.invalid}
                      className="h-12 bg-muted/40 focus-visible:ring-primary/20"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                    <p className="text-xs text-muted-foreground px-1">
                      Defaults to 1 hour.
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
                Start session
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
