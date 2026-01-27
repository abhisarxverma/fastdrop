import ShareFormHeaderGroup from "@/features/new-share/common/components/share-form-header-group";
import FileShareForm from "@/features/new-share/file/components/file-share-form";


export default function OpenFileSharePage() {
    return (
        <>
            <ShareFormHeaderGroup title="Share file" />
            <FileShareForm />
        </>
    )
}