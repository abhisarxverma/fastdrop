"use client";

import { useFormContext, Controller, useWatch } from "react-hook-form";
import { EditShareInput } from "@/schemas/share/edit-share";
import { ShareDialog } from "../share-dialog";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import RichTextEditor from "../rich-text-editor";
import { CodeEditor } from "../code-editor";
import { LanguageSelector } from "../language-selector";
import { FaEdit } from "react-icons/fa";

interface Props {
  index: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditItemModal({ index, open, onOpenChange }: Props) {
  const { control, register } = useFormContext<EditShareInput>();

  const item = useWatch({
    control,
    name: `items.${index}`,
  });

  if (!item) return null;

  return (
    <ShareDialog
      icon={<FaEdit className="size-5" />}
      open={open}
      onOpenChange={onOpenChange}
      title={`Edit ${item.item_type}`}
      submitLabel="Save"
      onSubmit={() => onOpenChange(false)}
    >
      <div className="space-y-6">
        <Field>
          <FieldLabel>Title</FieldLabel>
          <Input {...register(`items.${index}.title`)} />
        </Field>

        {item.item_type === "text" && (
          <Controller
            control={control}
            name={`items.${index}.content`}
            render={({ field }) => (
              <RichTextEditor
                value={field.value ?? ""}
                onChange={(val) => field.onChange(val ?? "")}
              />
            )}
          />
        )}

        {item.item_type === "code" && (
          <>
            <Controller
              control={control}
              name={`items.${index}.language`}
              render={({ field }) => (
                <LanguageSelector
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              control={control}
              name={`items.${index}.content`}
              render={({ field }) => (
                <CodeEditor
                  language={item.language}
                  value={field.value ?? ""}
                  onChange={(val) => field.onChange(val ?? "")}
                />
              )}
            />
          </>
        )}

        {item.item_type === "link" && (
          <Input type="url" {...register(`items.${index}.content`)} />
        )}
      </div>
    </ShareDialog>
  );
}
