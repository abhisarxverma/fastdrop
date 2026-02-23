import { Control, Controller, useWatch } from "react-hook-form";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LanguageSelector } from "../language-selector";
import { CodeEditor } from "../code-editor";
import { FolderShareFormValues } from "@/schemas/share/folder-share";

interface Props {
  index: number;
  control: Control<FolderShareFormValues>;
}


export function CodeItemFields({ index, control }: Props) {
  const language = useWatch({
    control,
    name: `items.${index}.language`,
  });

  return (
    <>
      <Controller
        name={`items.${index}.title`}
        control={control}
        render={({ field }) => (
          <Field>
            <FieldLabel>Snippet Title</FieldLabel>
            <Input {...field} />
          </Field>
        )}
      />

      <Controller
        name={`items.${index}.language`}
        control={control}
        render={({ field }) => (
          <Field>
            <FieldLabel>Language</FieldLabel>
            <LanguageSelector
              value={field.value}
              onChange={field.onChange}
            />
          </Field>
        )}
      />

      <Controller
        name={`items.${index}.content`}
        control={control}
        render={({ field }) => (
          <Field>
            <FieldLabel>Code</FieldLabel>
            <CodeEditor
              value={field.value}
              onChange={field.onChange}
              language={language}
            />
          </Field>
        )}
      />
    </>
  );
}