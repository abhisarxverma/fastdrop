import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-full flex-1 items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>

        <p className="text-md text-muted-foreground tracking-wide">
          Loading Fastdrop
        </p>
      </div>
    </div>
  );
}