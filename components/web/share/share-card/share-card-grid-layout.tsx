import { ShareItem } from "@/types/share-items";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getShareMeta } from "./lib/share-meta";

interface Props {
  item: ShareItem;
  createdAgo: string;
}

export function ShareCardGridLayout({ item, createdAgo }: Props) {
  const meta = getShareMeta(item);

  return (
    <Card className="group rounded-2xl border hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4 flex flex-col gap-6">
        <div
          className={`
            w-14 h-14 flex items-center justify-center rounded-2xl
            ${meta.iconBg}
          `}
        >
          <meta.Icon className="size-7" />
        </div>

        <div className="flex-1 w-full">
          <div className="flex items-center gap-2 mb-1 text-xs uppercase font-bold tracking-wider">
            <span className={meta.labelColor}>{meta.label}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground font-medium">
              {createdAgo}
            </span>
          </div>

          <h3 className="text-base font-semibold leading-snug line-clamp-2">
            {meta.title}
          </h3>
        </div>
      </CardContent>

      <CardFooter className="px-8 pb-8">
        <Button
          className="w-full rounded-xl font-semibold"
          variant={meta.buttonVariant}
        >
          <meta.ActionIcon className="size-4 mr-2" />
          {meta.actionLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}
