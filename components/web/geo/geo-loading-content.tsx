import { Loader2, MapPin } from "lucide-react";

export function GeoLoadingContent() {
  return (
    <div className="flex flex-col items-center space-y-6 animate-in fade-in duration-300">
      <div className="relative flex items-center justify-center">
        <div className="absolute inline-flex h-16 w-16 rounded-full bg-primary/10 animate-ping" />
        <div className="relative flex items-center justify-center h-16 w-16 rounded-full bg-primary/20">
          <MapPin className="size-7 text-primary" />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
          Getting your location
        </h1>
        <p className="text-sm text-muted-foreground">
          Checking your saved location and verifying proximity…
        </p>
      </div>

      <div className="flex items-center gap-2 text-primary text-sm font-medium">
        <Loader2 className="size-4 animate-spin" />
        Fetching location
      </div>

      <p className="text-xs text-muted-foreground">
        Location is only used for proximity filtering.
      </p>
    </div>
  );
}
