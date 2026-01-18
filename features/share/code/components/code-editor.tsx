"use client";

import { Editor, loader } from "@monaco-editor/react";
import { ScrollArea } from "@/components/ui/scroll-area"
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
        <ScrollArea className="w-full border border-border shadow-sm">
            <div className="min-h-81.25 max-h-[80vh]">
                <Editor
                    height="325px"
                    language={language}
                    value={value}
                    theme="vs-dark"
                    onChange={(val) => onChange(val ?? "")}
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
                    loading={
                        <div className="h-full w-full flex items-center justify-center bg-input/50 text-secondary-foreground">
                            Loading Editor <LuLoader className="animate-spin" />
                        </div>
                    }
                />
            </div>
        </ScrollArea>
    )
}