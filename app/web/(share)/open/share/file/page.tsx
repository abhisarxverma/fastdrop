import ShareFormHeaderGroup from "@/features/share/common/components/share-form-header-group";
import FileShareForm from "@/features/share/file/components/file-share-form";


export default function OpenFileSharePage() {
    return (
        <>
            <ShareFormHeaderGroup title="Share file" />
            <FileShareForm />
        </>
    )
}