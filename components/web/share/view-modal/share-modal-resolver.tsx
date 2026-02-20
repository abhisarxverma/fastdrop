import { ViewTextModal } from "./view-text-modal";
import RichTextEditor from "@/components/web/share/rich-text-editor"
import { ViewCodeModal } from "./view-code-modal";
import { CodeEditor } from "@/components/web/share/code-editor"
import { ViewFileModal } from "./view-file-modal"
import { ShareWithItems } from "@/types/shares"
import { ViewLinkModal } from "./view-link-modal"
import { codeLanguageInfo } from "@/constants/c"

export function ShareModalResolver({
  share,
  onClose,
}: {
  share: ShareWithItems;
  onClose: () => void;
}) {
  
  const item = share.items[0];
  switch (item.item_type) {
    case "text":
      return (
        <ViewTextModal open onOpenChange={onClose} title={share.title}>
          <RichTextEditor value={item.content_text} readOnly />
        </ViewTextModal>
      );

    case "code":
      return (
        <ViewCodeModal open onOpenChange={onClose} title={share.title} sharedAt={item.created_at}>
          <CodeEditor value={item.content_text} language={item.language} readOnly />
        </ViewCodeModal>
      );

    case "link":
      return (
        <ViewLinkModal
          open
          onOpenChange={onClose}
          title={share.title}
          url={item.content_text}
        />
      );

    case "file":
      return (
        <ViewFileModal
          open
          onOpenChange={onClose}
          title={share.title}
          fileName={item.file_name}
          sharedAt={item.created_at}
        />
      );

    default:
      return null;
  }
}
