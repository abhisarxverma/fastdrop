"use client";

import { AlertTriangle } from "lucide-react";
import Container from "@/components/layouts/container";

interface Props {
  message?: string;
}

export function SharingDisabledBanner({
  message = "Only host can share in this session",
}: Props) {
  return (
    <div className="w-full bg-yellow-300/30">
      <Container>
        <div className="flex items-center justify-center gap-2 py-2 text-[11px] font-medium text-yellow-400/80 uppercase tracking-widest text-center">
          <AlertTriangle className="size-4 shrink-0" />
          <span>{message}</span>
        </div>
      </Container>
    </div>
  );
}