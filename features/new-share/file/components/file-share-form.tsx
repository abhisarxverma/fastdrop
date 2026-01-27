"use client";

import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ExpirySelector } from "../../common/components/expiry-input";
import { getDefaultExpiry } from "@/lib/utils/formatters";
import FormShareButton from "../../common/components/form-share-button";
import { FileDropzone } from "./file-dropzone";
import { FileShareFormSchema } from "../validations";
import { fileShareAction } from "../actions";
import { useGeo } from "@/providers/geo-provider";
import { getExtension, removeExtension } from "../utils";
import { UploadedFileCard } from "./uploaded-file-card";
import FormLayout from "../../common/components/form-layout";

export default function FileShareForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { location: { lat, lng } } = useGeo();

  const form = useForm<z.infer<typeof FileShareFormSchema>>({
    resolver: zodResolver(FileShareFormSchema),
    defaultValues: {
      title: "",
      expires_at: getDefaultExpiry(),
      file_type: "",
      file_name: "",
    },
  });

  function onSubmit(data: z.infer<typeof FileShareFormSchema>) {
    if (!data.file) {
      toast.error("Please select a file first");
      return;
    }
    const payload = {
      ...data,
      expires_at: new Date(data.expires_at).toISOString(),
      lat,
      lng
    };

    startTransition(async () => {
      const response = await fileShareAction(payload);

      if (!response?.data?.success) {
        toast.error(response?.data?.error);
        return;
      } else {
        toast.success("File shared successfully!");
        router.push(ROUTES.HOME);
      }
    });
  }

  return (
    <FormLayout onSubmit={form.handleSubmit(onSubmit, (errors) => console.log("Validation Blocking:", errors))}>

      <Controller
        name="title"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Title</FieldLabel>
            <Input
              aria-invalid={fieldState.invalid}
              type="text"
              placeholder="Enter your share title"
              {...field}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="file"
        control={form.control}
        render={({ field, fieldState }) => {

          if (form.getValues("file")) return <></>;

          return (
            <Field>
              <FieldLabel>File</FieldLabel>
              <FileDropzone value={field.value} onChange={(file) => {
                field.onChange(file);
                if (file) {
                  form.setValue("file_name", file.name, { shouldValidate: true })
                  const ext = getExtension(file.name);
                  form.setValue("file_type", ext, { shouldValidate: true });
                } else {
                  form.setValue("file_type", "", { shouldValidate: true });
                }
              }} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )
        }} />

      <Controller control={form.control} name="file_name" render={({ field }) => {
        if (!form.getValues("file")) return <></>;
        return (
          <Field>
            <FieldLabel>
              Uploaded file
            </FieldLabel>
            <UploadedFileCard file={form.getValues("file")} fileName={removeExtension(field.value)} fileType={form.getValues("file_type")} onPreview={() => { }}
              onRemove={() => {
                form.setValue("file", null as unknown as File);
                form.setValue("file_type", "");
                form.setValue("file_name", "");
              }}
              onRename={(newName) => field.onChange(newName)}
            />
          </Field>)
      }} />

      <Controller
        name="expires_at"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Expiry</FieldLabel>
            <ExpirySelector value={field.value} onChange={field.onChange} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="file_type"
        control={form.control}
        render={({ field }) => (
          <Field>
            <input type="hidden" {...field} />
          </Field>
        )}
      />
      <FormShareButton
        isDisabled={false}
        isSubmitting={isPending}
        text="Share File"
      />
    </FormLayout>
  );
}
