"use client";

import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GeoCenteredStateProps {
  children: ReactNode;
  className?: string;
}

export function GeoCenteredState({
  children,
  className,
}: GeoCenteredStateProps) {
  return (
    <div className="flex-1 flex items-center justify-center bg-background px-6">
      <Card
        className={cn(
          "w-full max-w-md border bg-background/80 backdrop-blur-sm shadow-xl rounded-2xl transition-all duration-300",
          className
        )}
      >
        <CardContent className="flex flex-col items-center text-center py-10 px-6">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
