"use client";

import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Plus,
    FileText,
    Link,
    Code2,
    StickyNote,
} from "lucide-react";
import { ShareItemType } from "@/types/share-items";
import { Button } from "@/components/ui/button";

interface ShareFabProps {
    onSelect: (type: ShareItemType | null) => void;
}

export default function ShareFab({ onSelect }: ShareFabProps) {
    const [open, setOpen] = useState(false);

    const itemClass =
        "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors";

    const iconClass =
        "size-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors";

    return (
        <div className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50">
            <DropdownMenu open={open} onOpenChange={(val) => {
                setOpen(val);
            }}>

                <DropdownMenuContent
                    side="top"
                    align="end"
                    className="
            w-52
            mb-4
            rounded-xl
            border
            bg-background/95
            backdrop-blur-md
            shadow-2xl
            p-2
            animate-in fade-in slide-in-from-bottom-2
          "
                >
                    <DropdownMenuItem
                        onClick={() => onSelect("file")}
                        className={`${itemClass} group`}
                    >
                        <FileText className={iconClass} />
                        <span className="text-sm font-medium">File</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => onSelect("link")}
                        className={`${itemClass} group`}
                    >
                        <Link className={iconClass} />
                        <span className="text-sm font-medium">Link</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => onSelect("code")}
                        className={`${itemClass} group`}
                    >
                        <Code2 className={iconClass} />
                        <span className="text-sm font-medium">Code Snippet</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => onSelect("text")}
                        className={`${itemClass} group`}
                    >
                        <StickyNote className={iconClass} />
                        <span className="text-sm font-medium">Text Note</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>

                {/* FLOATING BUTTON */}
                <DropdownMenuTrigger asChild>
                    <Button
                        className="
              size-14
              sm:size-16
              rounded-full
              bg-primary
              text-white
              shadow-xl
              hover:shadow-2xl
              hover:scale-105
              active:scale-95
              transition-all
              flex
              items-center
              justify-center
            "
                    >
                        <Plus
                            className={`size-6 sm:size-7 transition-transform duration-300 ${open ? "rotate-45" : ""
                                }`}
                        />
                    </Button>
                </DropdownMenuTrigger>
            </DropdownMenu>
        </div>
    );
}
