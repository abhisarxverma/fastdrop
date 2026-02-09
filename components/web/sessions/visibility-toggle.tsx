// components/visibility-toggle.tsx
"use client";

import { Globe, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

interface VisibilityToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export function VisibilityToggle({
  value,
  onChange,
}: VisibilityToggleProps) {
  return (
    <ToggleGroup
      type="single"
      value={value ? "locked" : "open"}
      onValueChange={(v) => {
        if (!v) return;
        onChange(v === "locked");
      }}
      className="flex h-[52px] rounded-xl bg-muted p-1.5 border"
    >
      <ToggleGroupItem
        value="open"
        className={cn(
          "flex-1 rounded-lg flex gap-2 text-sm font-semibold",
          !value
            ? "bg-background shadow-sm text-primary"
            : "text-muted-foreground"
        )}
      >
        <Globe className="h-4 w-4" />
        Open
      </ToggleGroupItem>

      <ToggleGroupItem
        value="locked"
        className={cn(
          "flex-1 rounded-lg flex gap-2 text-sm font-semibold",
          value
            ? "bg-background shadow-sm text-yellow-700"
            : "text-muted-foreground"
        )}
      >
        <Lock className="h-4 w-4" />
        Locked
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
