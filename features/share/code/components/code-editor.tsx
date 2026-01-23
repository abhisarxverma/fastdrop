"use client";

import { Editor, loader } from "@monaco-editor/react";
// import { ScrollArea } from "@/components/ui/scroll-area"
import { LuLoader } from "react-icons/lu";
import { useEffect } from "react"

interface CodeEditorProps {
    value: string;
    language: string;
    onChange: (value: string) => void;
}

export default function CodeEditor({ value, language, onChange }: CodeEditorProps) {

    useEffect(() => {
        loader.init().then((monaco) => {
            monaco.editor.defineTheme("github-dark", {
                base: "vs-dark",
                inherit: true,
                rules: [
                    { token: "comment", foreground: "8b949e" },
                    { token: "keyword", foreground: "ff7b72" },
                    { token: "string", foreground: "a5d6ff" },
                    { token: "variable", foreground: "ffa657" },
                    { token: "type", foreground: "ffa657" },
                    { token: "function", foreground: "d2a8ff" },
                    { token: "number", foreground: "79c0ff" },
                ],
                colors: {
                    "editor.background": "#0d1117",
                    "editor.foreground": "#c9d1d9",
                    "editorLineNumber.foreground": "#484f58",
                    "editor.selectionBackground": "#1f6feb44",
                },
            });
        });
    }, []);


    return (
        <div className="w-full rounded-lg overflow-hidden border shadow-sm">
            <Editor
                height="60vh"
                language={language}
                value={value}
                theme="vs-dark"
                onChange={(value) => onChange(value ?? "")}
                options={{
                    fontSize: 14,
                    fontFamily: "'Cascadia Code', 'JetBrains Mono', monospace",
                    fontLigatures: true,
                    minimap: { enabled: false },
                    padding: { top: 16, bottom: 16 },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    formatOnPaste: true,
                    lineNumbers: "on",
                    scrollbar: {
                        verticalScrollbarSize: 10,
                        horizontalScrollbarSize: 10,
                    },
                }}
                loading={<div className="h-full w-full flex items-center justify-center gap-2 bg-input/30">Loading Editor <LuLoader className="animate-spin" /></div>}
            />
        </div>
    )
}