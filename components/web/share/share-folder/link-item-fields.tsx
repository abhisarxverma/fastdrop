import { Controller, Control } from "react-hook-form";
import { FolderShareFormValues } from "@/schemas/share/folder-share";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface Props {
  index: number;
  control: Control<FolderShareFormValues>;
}

export function LinkItemFields({ index, control }: Props) {
  return (
    <>
      <Controller
        name={`items.${index}.title`}
        control={control}
        render={({ field }) => (
          <Field>
            <FieldLabel>Link Title</FieldLabel>
            <Input {...field} />
          </Field>
        )}
      />

      <Controller
        name={`items.${index}.content`}
        control={control}
        render={({ field }) => (
          <Field>
            <FieldLabel>URL</FieldLabel>
            <Input
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              type="url"
            />
          </Field>
        )}
      />
    </>
  );
}
