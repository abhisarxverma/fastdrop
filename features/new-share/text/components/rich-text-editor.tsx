"use client";

import { useEditor, EditorContent, Editor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import { Level } from '@tiptap/extension-heading'

import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import {
  HiBold, HiItalic, HiUnderline, HiCodeBracket,
  HiListBullet, HiQueueList, HiLink,
  HiOutlinePencil
} from "react-icons/hi2";
import { FaMarkdown } from "react-icons/fa";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  initialContent?: string;
}

const Toolbar = ({ editor }: { editor: Editor }) => {

  const addLink = () => {
    const url = window.prompt("Enter URL");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const states = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold"),
      isItalic: ctx.editor.isActive("italic"),
      isUnderline: ctx.editor.isActive("underline"),
      isHighlight: ctx.editor.isActive("highlight"),
      isBulletlist: ctx.editor.isActive("bulletlist"),
      isOrderedList: ctx.editor.isActive("orderedList"),
      isCodeBlock: ctx.editor.isActive("codeBlock"),
      isLink: ctx.editor.isActive("link"),
      headingLevel: ctx.editor.isActive("heading", { level: 1 }) ? "1" :
        ctx.editor.isActive("heading", { level: 2 }) ? "2" :
          ctx.editor.isActive("heading", { level: 3 }) ? "3" : "0",
    }),
  });

  if (!editor) return null;

  return (
    <div className="toolbar flex flex-wrap items-center gap-1 bg-secondary/50 border-b border-border rounded-t-lg p-1">
      <Toggle
        size="sm"
        pressed={states.isBold}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <HiBold className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={states.isItalic}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <HiItalic className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={states.isUnderline}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <HiUnderline className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={states.isHighlight}
        onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
      >
        <HiOutlinePencil className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="mx-1 h-8" />

      <Select
        value={states.headingLevel}
        onValueChange={(val) => {
          const level = parseInt(val);
          if (level === 0) {
            editor.chain().focus().setParagraph().run();
          } else {
            editor.chain().focus().setHeading({ level: level as Level }).run();
          }
        }}
      >
        <SelectTrigger className="h-8 w-32 text-xs">
          <SelectValue placeholder="Style" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Paragraph</SelectItem>
          <SelectItem value="1">Heading 1</SelectItem>
          <SelectItem value="2">Heading 2</SelectItem>
          <SelectItem value="3">Heading 3</SelectItem>
        </SelectContent>
      </Select>


      <Separator orientation="vertical" className="mx-1 h-8" />

      <Toggle
        size="sm"
        pressed={states.isBulletlist}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <HiListBullet className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={states.isOrderedList}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <HiQueueList className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="mx-1 h-8" />

      <Toggle
        size="sm"
        pressed={states.isCodeBlock}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <HiCodeBracket className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={states.isLink}
        onPressedChange={addLink}
      >
        <HiLink className="h-4 w-4" />
      </Toggle>

      <div className="ml-auto mr-2 flex items-center gap-1 text-muted-foreground">
        <FaMarkdown size="1.2rem" title="Markdown supported" />
      </div>
    </div>
  );
};

export default function RichTextEditor({ value, onChange, initialContent = "" }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline underline-offset-4 cursor-pointer",
        },
      }),
    ],
    immediatelyRender: false,
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm dark:prose-invert max-w-none focus:outline-none flex-1 h-full overflow-y-auto p-4 bg-transparent",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="flex-1 flex flex-col border border-input rounded-md overflow-hidden min-h-100 max-h-[90vh] bg-input/30">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
    </div>
  );
}
