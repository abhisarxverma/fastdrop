import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface GeoEnableContentProps {
  onRequest: () => void;
  requested: boolean;
  error?: string | null;
}

export function GeoEnableContent({
  onRequest,
  requested,
  error,
}: GeoEnableContentProps) {
  return (
    <div className="flex flex-col items-center space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/20">
        <MapPin className="size-7 text-primary" />
      </div>

      <div className="space-y-2">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
          Enable Location
        </h1>
        <p className="text-sm text-muted-foreground">
          Fastdrop uses your location to show and share files with nearby devices.
          This works without login and stays local.
        </p>
      </div>

      {error && (
        <p className="text-sm text-destructive font-medium">{error}</p>
      )}

      <Button
        size="lg"
        onClick={onRequest}
        disabled={requested}
        className="w-full sm:w-auto"
      >
        {requested ? "Requesting..." : "Enable Location"}
      </Button>

      <p className="text-xs text-muted-foreground">
        Location is only used for proximity filtering.
      </p>
    </div>
  );
}
