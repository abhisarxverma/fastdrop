"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editShareActionSchema, EditShareInput } from "@/schemas/share/edit-share";
import { ShareWithItems } from "@/types/shares";
import { mapShareToEditFormValues } from "@/lib/utils/map-share-to-edit-form-values";
import { editShareAction } from "@/actions/share.actions";
import { unwrapActionResult } from "@/lib/actions/unwrap-result";
import { ShareDialog } from "../share-dialog";
import { toast } from "sonner";
import { useTransition } from "react";
import { FaEdit } from "react-icons/fa";
import { SingleItemEditFields } from "./single-item-edit-fields";

interface Props {
  share: ShareWithItems;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SingleShareEditModal({
  share,
  open,
  onOpenChange,
}: Props) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<EditShareInput>({
    resolver: zodResolver(editShareActionSchema),
    defaultValues: mapShareToEditFormValues(share),
  });

  const item = useWatch({
    control: form.control,
    name: "items.0"
  })

  function onSubmit(values: EditShareInput) {
    startTransition(async () => {
      try {
        const res = await editShareAction(values);
        unwrapActionResult(res);
        toast.success("Share updated");
        onOpenChange(false);
      } catch(e) {
        console.log("Error in single share edit : ", (e as Error));
        toast.error((e as Error).message || "Failed to update");
      }
    });
  }

  if (!item) return null;

  return (
    <ShareDialog
      icon={<FaEdit className="size-5" />}
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Share"
      submitLabel="Save Changes"
      isSubmitting={isPending}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <SingleItemEditFields form={form} />
    </ShareDialog>
  );
}