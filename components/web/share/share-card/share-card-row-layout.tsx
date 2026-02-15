import { ShareItem } from "@/types/share-items";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getShareMeta } from "./lib/share-meta";

interface Props {
  item: ShareItem;
  createdAgo: string;
}

export function ShareCardRowLayout({ item, createdAgo }: Props) {
  const meta = getShareMeta(item);

  return (
    <Card className="group rounded-md border hover:border-primary/30 transition-all shadow-sm">
      <div className="flex items-center justify-between p-3 gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div
            className={`
              size-10 flex items-center justify-center rounded-lg shrink-0
              ${meta.iconBg}
            `}
          >
            <meta.Icon className="size-5" />
          </div>

          <div className="flex flex-col min-w-0">
            <h3 className="text-sm font-semibold truncate">
              {meta.title}
            </h3>
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              {meta.label}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <span className="text-xs text-muted-foreground font-medium">
            {createdAgo}
          </span>

          <Button
            size="sm"
            variant="secondary"
            className="rounded-lg font-semibold"
          >
            <meta.ActionIcon className="size-4 mr-1" />
            {meta.actionShortLabel}
          </Button>
        </div>
      </div>
    </Card>
  );
}
