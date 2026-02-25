"use client";

import RichTextEditor from "@/components/web/share/rich-text-editor";
import { CodeEditor } from "@/components/web/share/code-editor";

import { ShareItem } from "@/types/share-items";
import { codeLanguageInfo } from "@/constants/monaco-languages";
import { fileTypes } from "@/constants/file-type-info";
import { ViewTextModal } from "../view-modal/view-text-modal";
import { ViewCodeModal } from "../view-modal/view-code-modal";
import { ViewLinkModal } from "../view-modal/view-link-modal";
import { ViewFileModal } from "../view-modal/view-file-modal";

interface Props {
  item: ShareItem | null;
  open: boolean;
  onClose: () => void;
  shareTitle: string;
}

export function ShareItemViewResolver({
  item,
  open,
  onClose,
  shareTitle,
}: Props) {
  if (!item) return null;

  switch (item.item_type) {
    case "text":
      return (
        <ViewTextModal
          open={open}
          onOpenChange={onClose}
          title={shareTitle}
          description="Rich Text"
          createdAt={item.created_at}
        >
          <RichTextEditor value={item.content_text} readOnly />
        </ViewTextModal>
      );

    case "code": {
      const languageMeta = codeLanguageInfo[item.language];

      return (
        <ViewCodeModal
          open={open}
          onOpenChange={onClose}
          title={shareTitle}
          description={`${languageMeta.name} Code`}
          createdAt={item.created_at}
          LanguageIcon={languageMeta.icon}
        >
          <CodeEditor
            value={item.content_text}
            language={item.language}
            readOnly
          />
        </ViewCodeModal>
      );
    }

    case "link":
      return (
        <ViewLinkModal
          open={open}
          onOpenChange={onClose}
          title={shareTitle}
          url={item.content_text}
          createdAt={item.created_at}
        />
      );

    case "file": {
      const fileInfo = fileTypes[item.file_type];

      return (
        <ViewFileModal
          open={open}
          onOpenChange={onClose}
          title={shareTitle}
          description={fileInfo.name}
          fileName={item.file_name}
          createdAt={item.created_at}
          FileIcon={fileInfo.icon}
        />
      );
    }

    default:
      return null;
  }
}