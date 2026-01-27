import CodeShareForm from "@/features/new-share/code/components/code-share-form";
import ShareFormHeaderGroup from "@/features/new-share/common/components/share-form-header-group";

export default function OpenCodeSharePage() {
    return (
        <>
            <ShareFormHeaderGroup title="Share code" />
            <CodeShareForm />
        </>
    )
}