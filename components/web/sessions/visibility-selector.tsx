import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Globe, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label";

export type VisibilitySelectType = "open" | "locked"

export function VisibilitySelect({
  visibility,
  setVisibility,
}: {
  visibility: string
  setVisibility: React.Dispatch<React.SetStateAction<VisibilitySelectType>>;
}) {
  return (
    <div className="flex flex-col gap-2">
        <Label>Session Visibility</Label>
    <div className="flex rounded-xl h-[52px] bg-muted p-1.5 border">
      <Select value={visibility} onValueChange={(val) => setVisibility(val as VisibilitySelectType)}>
        <SelectTrigger
          className={cn(
            "flex-1 flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition",
            visibility === "open"
              ? "bg-background shadow-sm text-primary"
              : visibility === "locked"
              ? "bg-background shadow-sm text-yellow-700"
              : "text-muted-foreground"
          )}
        >
          {visibility === "open" ? (
            <>
              <Globe className="h-4 w-4" />
              <SelectValue placeholder="Open" />
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" />
              <SelectValue placeholder="Locked" />
            </>
          )}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="open" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Open
          </SelectItem>
          <SelectItem value="locked" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Locked
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
    {visibility === "open" ? (
              <p className="text-xs text-muted-foreground px-1">
                Anyone nearby can join and view content instantly.
              </p>
            ) : (
              <p className="text-xs text-muted-foreground px-1">
                Requires a secure entry code for participants to join.
              </p>
            )}
    </div>
  )
}
