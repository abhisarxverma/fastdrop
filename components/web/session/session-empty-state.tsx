"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PackageOpen, Plus } from "lucide-react";

interface SessionEmptyStateProps {
  isHost?: boolean;
  onCreateClick?: () => void;
}

export function SessionEmptyState({
  isHost,
  onCreateClick,
}: SessionEmptyStateProps) {
  return (
    <div className="flex flex-1 items-center justify-center py-20 px-4">
      <Card className="w-full max-w-md border-dashed">
        <CardContent className="flex flex-col items-center text-center gap-6 py-12">

          <div className="size-20 rounded-2xl bg-muted flex items-center justify-center">
            <PackageOpen className="size-10 text-muted-foreground" />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-semibold">
              Nothing shared yet
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Be the first to drop a file, link, or note into this session.
            </p>
          </div>

          {isHost && (
            <Button
              onClick={onCreateClick}
              className="gap-2"
            >
              <Plus className="size-4" />
              Add something
            </Button>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
