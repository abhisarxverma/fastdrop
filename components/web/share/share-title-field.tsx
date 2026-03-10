"use client";

import { Controller, Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { textShareFormSchema } from "@/schemas/share/text-share";
import z from "zod";

interface ShareTitleFieldProps {
    control: Control<z.infer<typeof textShareFormSchema>>;
    name?: string;
    placeholder?: string;
}

export function ShareTitleField({
    control,
    name = "title",
    placeholder = "Give your share a title...",
}: ShareTitleFieldProps) {
    return (
        <Controller
            name={name as keyof z.infer<typeof textShareFormSchema>}
            control={control}
            render={({ field, fieldState }) => (
                <Field>
                    <FieldLabel className="uppercase text-xs tracking-wider text-muted-foreground font-semibold">
                        Title
                    </FieldLabel>

                    <Input
                        {...field}
                        placeholder={placeholder}
                        className="h-11 rounded-xl"
                    />

                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    );
}
