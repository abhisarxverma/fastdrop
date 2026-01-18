import CodeShareForm from "@/features/share/code/components/code-share-form";
import ShareFormHeaderGroup from "@/features/share/common/components/share-form-header-group";

export default function OpenCodeSharePage() {
    return (
        <>
            <ShareFormHeaderGroup title="Share code" />
            <CodeShareForm />
        </>
    )
}