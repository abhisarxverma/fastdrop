"use client";

import { useTransition } from "react";
import CodeEditor from "./code-editor";
import { ExpirySelector } from "../../common/components/expiry-input";
import { getDefaultExpiry } from "@/lib/utils/formatters";
import FormShareButton from "../../common/components/form-share-button";
import { codeShareAction } from "../actions";
import { Controller, useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CodeShareFormSchema } from "../validation";
import { z } from "zod";
import { useGeo } from "@/providers/geo-provider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import FormLayout from "../../common/components/form-layout";
import { LanguageSelector } from "./language-selector";
import FileNameInput from "../../common/components/filename-input";
import { getExtensionFromLanguage, getLanguageIcon } from "../../common/utils";
import { IconType } from "react-icons";

export default function ShareTextForm() {

    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    const { location } = useGeo();

    const form = useForm({
        resolver: zodResolver(CodeShareFormSchema),
        values: {
            title: "",
            content: "",
            expires_at: getDefaultExpiry(),
            language: "java",
            file_name: ""
        }
    });

    const selectedLanguage = useWatch({ control: form.control, name: "language", });
    

    function onSubmit(data: z.infer<typeof CodeShareFormSchema>) {
        const payload = {
            ...data,
            expires_at: new Date(data.expires_at).toISOString(),
            lat: location.lat,
            lng: location.lng
        };

        startTransition(async () => {
            const response = await codeShareAction(payload);
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
        <>
            <FormLayout onSubmit={form.handleSubmit(onSubmit, (errors) => console.log("Validation Blocking:", errors))}>
                <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                    <Controller name="title" control={form.control} render={({ field, fieldState }) => (
                        <Field className="flex-2">
                            <FieldLabel>Title</FieldLabel>
                            <Input aria-invalid={fieldState.invalid} type="text" placeholder="Enter your share title" {...field} />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )} />
                    <Controller name="language" control={form.control} render={({ field, fieldState }) => (
                        <Field className="flex-1">
                            <FieldLabel>Language</FieldLabel>
                            <LanguageSelector value={field.value} onChange={field.onChange} />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )} />

                </div>
                <Field>
                    <Controller name="file_name" control={form.control} render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>Code</FieldLabel>
                            <FileNameInput
                                value={field.value}
                                onChange={field.onChange}
                                Icon={getLanguageIcon(selectedLanguage) as IconType}
                                extension={getExtensionFromLanguage(selectedLanguage)}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )} />
                    <Controller name="content" control={form.control} render={({ field, fieldState }) => (
                        <Field>
                            <CodeEditor
                                value={field.value}
                                onChange={field.onChange}
                                language={selectedLanguage}
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
        </>

    )
}