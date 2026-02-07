import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";

export function PrivateBadge() {
  return (
    <Badge
      variant="outline"
      className="flex items-center gap-1 bg-orange-500/10 text-orange-600 border-orange-500/20"
    >
      <Lock className="h-3 w-3" />
      PRIVATE
    </Badge>
  );
}
