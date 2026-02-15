"use client";

import { ShareItem } from "@/types/share-items";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { relativeTimeFromNow } from "@/lib/utils/formatters";
import { getShareMeta } from "./lib/share-meta";

interface Props {
  item: ShareItem;
  title: string;
  createdAt: string;
  view: "grid" | "rows";
}

export function ShareItemCard({
  item,
  title,
  createdAt,
  view,
}: Props) {
  const meta = getShareMeta(item);
  const createdAgo = relativeTimeFromNow(createdAt);

  if (view === "grid") {
    return (
      <Card className="rounded-2xl hover:shadow-lg transition">
        <CardContent className="p-6 space-y-4">
          <div className={`size-12 rounded-xl flex items-center justify-center ${meta.iconBg}`}>
            <meta.Icon className="size-6" />
          </div>

          <div>
            <p className="text-xs uppercase text-muted-foreground">
              {meta.label} • {createdAgo}
            </p>
            <h3 className="font-semibold line-clamp-2">{title}</h3>
          </div>
        </CardContent>

        <CardFooter>
          <Button variant={meta.buttonVariant} className="w-full">
            <meta.ActionIcon className="size-4 mr-2" />
            {meta.actionLabel}
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="rounded-lg hover:border-primary/30 transition">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className={`size-10 rounded-lg flex items-center justify-center ${meta.iconBg}`}>
            <meta.Icon className="size-5" />
          </div>

          <div>
            <h3 className="font-semibold text-sm">{title}</h3>
            <p className="text-xs text-muted-foreground">
              {meta.label} • {createdAgo}
            </p>
          </div>
        </div>

        <Button size="sm" variant={meta.buttonVariant}>
          <meta.ActionIcon className="size-4 mr-1" />
          {meta.actionShortLabel}
        </Button>
      </div>
    </Card>
  );
}
