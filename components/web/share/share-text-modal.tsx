"use client";

import { useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MdNotes } from "react-icons/md";
import { ShareDialog } from "./share-dialog";
import RichTextEditor from "./rich-text-editor";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { textShareFormSchema } from "@/schemas/share/text-share";
import { textShareAction } from "@/actions/share.actions";
import { unwrapActionResult } from "@/lib/actions/unwrap-result";

interface ShareTextModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    session_id: string;
}

export function ShareTextModal({
    open,
    onOpenChange,
    session_id
}: ShareTextModalProps) {
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(textShareFormSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    });

    function handleSubmit(data: z.infer<typeof textShareFormSchema>) {
        const actionInput = {
            ...data,
            share_type: "single",
            session_id
        }
        startTransition(async () => {
            try {
                const res = await textShareAction(actionInput);
                const data = unwrapActionResult(res);
                console.log("Text share data: ", data);
                toast.success("Text shared successfully!");
                onOpenChange(false);
                form.reset();
            } catch (error) {
                toast.error("Something went wrong!");
                console.error((error as Error));
            }
        });
    }

    return (
        <ShareDialog
            open={open}
            onOpenChange={onOpenChange}
            icon={<MdNotes className="size-5" />}
            title="Share Text"
            description="Quickly share formatted notes or links"
            submitLabel="Share text"
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
                                placeholder="Enter share title"
                                className="h-11 rounded-xl"
                            />

                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="content"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel className="uppercase text-xs tracking-wider text-muted-foreground font-semibold">
                                Content
                            </FieldLabel>

                            <div className="rounded-xl border bg-background focus-within:ring-1 focus-within:ring-primary">
                                <RichTextEditor
                                    value={field.value}
                                    onChange={field.onChange}
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
