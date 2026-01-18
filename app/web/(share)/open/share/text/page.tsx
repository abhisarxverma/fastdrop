"use client";

import ShareFormHeaderGroup from "@/features/share/common/components/share-form-header-group";
import ShareTextForm from "@/features/share/text/components/text-share-form";

export default function OpenTextSharePage() {
    return (
        <>
            <ShareFormHeaderGroup title="Share text" />
            <ShareTextForm />
        </>
    )
}