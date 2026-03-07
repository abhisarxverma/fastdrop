"use client";

import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MdCancel } from "react-icons/md";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
  onBan?: () => void;
}

export function ShareActionsMenu({ onEdit, onDelete, onBan }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit}>
          <Pencil className="size-4 mr-2" />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onDelete}
          className="text-red-600 focus:text-red-600"
        >
          <Trash2 className="size-4 mr-2" />
          Delete
        </DropdownMenuItem>

        {onBan && <DropdownMenuItem
          onClick={onBan}
          className="text-red-600 focus:text-red-600"
        >
          <MdCancel className="size-4 mr-2" />
          Ban user
        </DropdownMenuItem>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}