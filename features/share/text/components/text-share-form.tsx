"use client";

import { useTransition } from "react";
import RichTextEditor from "./rich-text-editor";
import { ExpirySelector } from "../../common/components/expiry-input";
import { getDefaultExpiry } from "@/lib/utils/formatters";
import FormShareButton from "../../common/components/form-share-button";
import { textShareAction } from "../actions";
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TextShareFormSchema } from "../validations";
import { z } from "zod";
import { useGeo } from "@/providers/geo-provider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import FormLayout from "../../common/components/form-layout";
import FileNameInput from "../../common/components/filename-input";

export default function ShareTextForm() {

    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    const { location } = useGeo();

    const form = useForm({
        resolver: zodResolver(TextShareFormSchema),
        defaultValues: {
            title: "",
            content: "",
            expires_at: getDefaultExpiry(),
            file_name: ""
        }
    });

    function onSubmit(data: z.infer<typeof TextShareFormSchema>) {
        console.log("submitting")
        const payload = {
            ...data,
            expires_at: new Date(data.expires_at).toISOString(),
            lat: location.lat,
            lng: location.lng
        };

        startTransition(async () => {
            const response = await textShareAction(payload);
            console.log("Response : ", response);

            if (!response?.data?.success) {
                toast.error(response?.data?.error);
                return;
            }
            else {
                toast.success("Shared successfully!");
                router.push(ROUTES.HOME);
            }
        })
    }

    return (
        <FormLayout onSubmit={form.handleSubmit(onSubmit, (errors) => console.log("Validation Blocking:", errors))}>
            <Controller name="title" control={form.control} render={({ field, fieldState }) => (
                <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input aria-invalid={fieldState.invalid} type="text" placeholder="Enter your share title" {...field} />
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )} />
            <Field>
                <Controller name="file_name" control={form.control} render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel>File</FieldLabel>
                        <FileNameInput 
                            value={field.value}
                            onChange={field.onChange}
                            extension="txt"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )} />
                <Controller name="content" control={form.control} render={({ field, fieldState }) => (
                    <Field>
                        {/* <FieldLabel>Content</FieldLabel> */}
                        <RichTextEditor
                            value={field.value}
                            onChange={field.onChange}
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )} />
            </Field>
            <Controller name="expires_at" control={form.control} render={({ field, fieldState }) => (
                <Field>
                    <FieldLabel>Expiry</FieldLabel>
                    <ExpirySelector value={field.value} onChange={field.onChange} />
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )} />
            <FormShareButton isDisabled={false} isSubmitting={isPending} addClasses="mt-5" text="Share" />
        </FormLayout>

    )
}