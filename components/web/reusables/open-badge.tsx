import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";

export function OpenBadge() {
  return (
    <Badge
      variant="outline"
      className="flex items-center gap-1 bg-blue-500/10 text-blue-500 border-blue-500/20"
    >
      <Globe className="h-3 w-3" />
      OPEN
    </Badge>
  );
}
