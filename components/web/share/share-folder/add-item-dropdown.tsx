"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Props {
  onAdd: (type: "code" | "text" | "link" | "file") => void;
}

export function AddItemDropdown({ onAdd }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 size-4" />
          Add Item
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => onAdd("code")}>Code</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAdd("text")}>Text</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAdd("link")}>Link</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAdd("file")}>File</DropdownMenuItem>
        {/* <DropdownMenuItem onClick={() => onAdd("folder")}>Folder</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}