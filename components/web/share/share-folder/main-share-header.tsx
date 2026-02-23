// components/multi/main-share-header.tsx
"use client";

import { Control, Controller } from "react-hook-form";
import { FolderShareFormValues } from "@/schemas/share/folder-share";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface MainShareHeaderProps {
  control: Control<FolderShareFormValues>;
}

export function MainShareHeader({
  control,
}: MainShareHeaderProps) {
  return (
    <Controller
      name="title"
      control={control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel className="uppercase text-xs tracking-wider text-muted-foreground font-semibold">
            Folder Title
          </FieldLabel>

          <Input
            value={field.value ?? ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            ref={field.ref}
            placeholder="Enter folder title"
          />

          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  );
}