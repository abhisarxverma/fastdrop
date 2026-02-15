import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";

interface FileNameInputProps {
  value: string;
  onChange?: (value: string) => void;
  Icon?: IconType;
  extension: string;
  readOnly?: boolean;
}

export function FileNameInput({
  value,
  onChange,
  Icon,
  extension,
  readOnly = false,
}: FileNameInputProps) {
  return (
    <div
      className={cn(
        "flex items-stretch w-full rounded-lg border bg-background",
        "focus-within:ring-1 focus-within:ring-primary transition-all"
      )}
    >
      {Icon && (
        <div className="flex items-center justify-center px-3 text-muted-foreground border-r bg-muted/40">
          <Icon className="size-4" />
        </div>
      )}

      {readOnly ? (
        <div className="flex-1 px-3 py-2 text-sm font-medium text-foreground truncate">
          {value}
        </div>
      ) : (
        <Input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="Enter file name"
          className="
            border-0
            focus-visible:ring-0
            focus-visible:ring-offset-0
            shadow-none
            rounded-none
            px-3
          "
        />
      )}

      <div
        className="
          flex items-center
          px-3
          text-sm font-medium
          text-muted-foreground
          bg-muted/50
          border-l
          select-none
          rounded-r-lg
        "
      >
        .{extension}
      </div>
    </div>
  );
}
