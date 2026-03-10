"use client";

import { Ban } from "lucide-react";
import Container from "@/components/layouts/container";

interface Props {
  message?: string;
}

export function UserBannedBanner({
  message = "Your sharing access has been restricted by the host.",
}: Props) {
  return (
    <div className="w-full bg-red-950/30 ">
      <Container>
        <div className="flex items-center justify-center gap-2 py-2 text-[11px] font-medium text-red-400/80 uppercase tracking-widest text-center">
          <Ban className="size-4 shrink-0" />
          <span>{message}</span>
        </div>
      </Container>
    </div>
  );
}