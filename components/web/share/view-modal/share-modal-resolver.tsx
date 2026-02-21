import { ViewTextModal } from "./view-text-modal";
import RichTextEditor from "@/components/web/share/rich-text-editor";
import { ViewCodeModal } from "./view-code-modal";
import { CodeEditor } from "@/components/web/share/code-editor";
import { ViewFileModal } from "./view-file-modal";
import { ShareWithItems } from "@/types/shares";
import { codeLanguageInfo } from "@/constants/monaco-languages";
import { fileTypes } from "@/constants/file-type-info"
import { CodeShareItem, FileShareItem, LinkShareItem, TextShareItem } from "@/types/share-items";
import { ViewLinkModal } from "./view-link-modal";

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
      const textShareItem = item as TextShareItem;
      return (
        <ViewTextModal
          open
          onOpenChange={onClose}
          title={share.title}
          description="Rich Text"
          createdAt={item.created_at}
        >
          <RichTextEditor value={textShareItem.content_text} readOnly />
        </ViewTextModal>
      );

    case "code": {
      const codeShareItem = item as CodeShareItem;
      const languageMeta = codeLanguageInfo[codeShareItem.language];

      return (
        <ViewCodeModal
          open
          onOpenChange={onClose}
          title={share.title}
          description={`${languageMeta.name} Code`}
          createdAt={codeShareItem.created_at}
          LanguageIcon={languageMeta.icon}
        >
          <CodeEditor
            value={codeShareItem.content_text}
            language={codeShareItem.language}
            readOnly
          />
        </ViewCodeModal>
      );
    }

    case "link":
      const linkShareItem = item as LinkShareItem;
      return (
        <ViewLinkModal
          open
          onOpenChange={onClose}
          title={share.title}
          url={linkShareItem.content_text}
          createdAt={linkShareItem.created_at}
        />
      );

    case "file":
      const fileShareItem = item as FileShareItem;
      const fileInfo = fileTypes[fileShareItem.file_type];
      return (
        <ViewFileModal
          open
          onOpenChange={onClose}
          title={share.title}
          description={fileInfo.name}
          fileName={fileShareItem.file_name}
          createdAt={fileShareItem.created_at}
          FileIcon={fileInfo.icon}
        />
      );

    default:
      return null;
  }
}