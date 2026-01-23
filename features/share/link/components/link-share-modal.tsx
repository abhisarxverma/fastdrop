"use client"

import { useState, useTransition, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FaRegClipboard } from "react-icons/fa"
import { useDebounce } from "use-debounce"
import { fetchMetadata, linkShareAction } from "../actions"
import { useGeo } from "@/providers/geo-provider"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { getDefaultExpiry } from "@/lib/utils/formatters"
import { LinkShareFormSchema } from "../validation"
import { toast } from "sonner"
import { z } from "zod"
import { useWatch, UseFormReturn } from "react-hook-form"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { ExpirySelector } from "../../common/components/expiry-input"
import FormShareButton from "../../common/components/form-share-button"
import { LinkPreviewCard } from "./link-preview-card"
import { validateLinkStructure } from "../utils"
import { MetadataResponse } from "../types"

export type LinkStatusType = "empty" | "validating" | "valid" | "invalid";

export default function LinkShareModal({ open, setOpen }: { open: boolean, setOpen: (val: boolean) => void }) {
  const [isPending, startTransition] = useTransition()
  const [linkStatus, setLinkStatus] = useState<MetadataResponse | null>(null);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const { location } = useGeo()

  const form: UseFormReturn<z.infer<typeof LinkShareFormSchema>> = useForm({
    resolver: zodResolver(LinkShareFormSchema),
    defaultValues: {
      title: "",
      content: "",
      expires_at: getDefaultExpiry(),
    },
  })

  const content = useWatch({ control: form.control, name: "content", })
  const [debouncedContent] = useDebounce(content, 600)

  useEffect(() => {
    if (!debouncedContent) return

    const validateLink = async () => {
      if (!validateLinkStructure(debouncedContent)) return;
      setIsValidating(true);
      const res = await fetchMetadata(debouncedContent)
      console.log("Res : ", res);
      setLinkStatus(res);
      if (res.status === "ok") {
        toast.success("Link is valid to share");
      }
      else {
        toast.error(res.message)
      }
      setIsValidating(false);
    }
    validateLink();
  }, [debouncedContent])

  function onSubmit(data: z.infer<typeof LinkShareFormSchema>) {
    const payload = {
      ...data,
      expires_at: new Date(data.expires_at).toISOString(),
      lat: location.lat,
      lng: location.lng,
    }

    startTransition(async () => {
      const response = await linkShareAction(payload)
      if (!response?.data?.success) {
        toast.error(response?.data?.error)
        return
      }
      toast.success("Shared successfully!")
      form.reset({
        title: "",
        content: "",
        expires_at: getDefaultExpiry(),
      })
      setLinkStatus(null);
      setOpen(false)
    })
  }

  const pasteFromClipboard = async () => {
    const text = await navigator.clipboard.readText()
    form.setValue("content", text)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Share Link</DialogTitle>
          <p className="text-sm text-muted-foreground">
            People in 30m radius will instantly see this share
          </p>
        </DialogHeader>
        <div className="flex gap-5 h-full mt-5">
          <form className="flex-1 h-full" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="h-full flex flex-col justify-between gap-5">
              <div className="h-full flex flex-col gap-5">
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Share title</FieldLabel>
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
                  name="content"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Link</FieldLabel>
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Paste a link..."
                          value={field.value}
                          onChange={field.onChange}
                        />
                        <Button variant="ghost" size="icon" onClick={pasteFromClipboard}>
                          <FaRegClipboard className="h-4 w-4" />
                        </Button>
                      </div>
                      {linkStatus && linkStatus.status === "ok" && <FieldLabel className="text-primary">Link is valid to share</FieldLabel>}
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

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
              </div>

              <FormShareButton
                isSubmitting={isPending}
                addClasses="mt-5"
                text="Share"
                isDisabled={!form.formState.isValid && !(linkStatus && linkStatus.status === "ok")}
              />
            </FieldGroup>
          </form>
          <div className="flex-1 h-full pb-3">
            <LinkPreviewCard response={linkStatus} isValidating={isValidating} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
