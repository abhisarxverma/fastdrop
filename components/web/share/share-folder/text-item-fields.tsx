import { Control, Controller } from "react-hook-form";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import RichTextEditor from "../rich-text-editor";
import { FolderShareFormValues } from "@/schemas/share/folder-share";

interface Props {
  index: number;
  control: Control<FolderShareFormValues>;
}

export function TextItemFields({ index, control }: Props) {
  return (
    <>
      <Controller
        name={`items.${index}.title`}
        control={control}
        render={({ field }) => (
          <Field>
            <FieldLabel>Item Title</FieldLabel>
            <Input {...field} />
          </Field>
        )}
      />

      <Controller
        name={`items.${index}.content`}
        control={control}
        render={({ field }) => (
          <Field>
            <FieldLabel>Content</FieldLabel>
            <RichTextEditor
              value={field.value}
              onChange={field.onChange}
            />
          </Field>
        )}
      />
    </>
  );
}