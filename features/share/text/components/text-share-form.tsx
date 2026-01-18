"use client";

import { useTransition } from "react";
import RichTextEditor from "./rich-text-editor";
import { ExpirySelector } from "../../components/expiry-input";
import { getDefaultExpiry } from "@/lib/utils/formatters";
import FormShareButton from "../../components/form-share-button";
import { createTextShareAction } from "../actions";
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createTextShareFormSchema } from "../validations";
import { z } from "zod";
import { useGeo } from "@/providers/geo-provider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function ShareTextForm() {

    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    const { location } = useGeo();

    const form = useForm({
        resolver: zodResolver(createTextShareFormSchema),
        values: {
            title: "",
            content: "",
            expires_at: getDefaultExpiry()
        }
    });

    function onSubmit(data: z.infer<typeof createTextShareFormSchema>) {
        console.log("submitting")
        const payload = {
            ...data,
            expires_at : new Date(data.expires_at).toISOString(),
            lat: location.lat,
            lng: location.lng
        };

        startTransition(async () => {
            const response = await createTextShareAction(payload);
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
        <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.log("Validation Blocking:", errors))}>
            <FieldGroup>
                <Controller name="title" control={form.control} render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel>Title</FieldLabel>
                        <Input aria-invalid={fieldState.invalid} type="text" placeholder="What not to do to stay dead" {...field} />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )} />
                <Controller name="content" control={form.control} render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel>Content</FieldLabel>
                        <RichTextEditor
                            value={field.value}
                            onChange={field.onChange}
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )} />
                <Controller name="expires_at" control={form.control} render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel>Expiry</FieldLabel>
                        <ExpirySelector value={field.value} onChange={field.onChange} />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )} />
            </FieldGroup>
            <FormShareButton isSubmitting={isPending} addClasses="mt-5" text="Share" />
        </form>
    )
}