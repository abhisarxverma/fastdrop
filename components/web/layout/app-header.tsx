"use client";

import ProximityIndicator from "../indicators/proximity-indicator";
import Container from "../../layouts/container";
import Logo from "../reusables/logo";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { cn } from "@/lib/utils";

export function AppHeader() {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "border-b",
        "bg-background/70 backdrop-blur-xl",
        "supports-backdrop-filter:bg-background/60"
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-16">

          <div className="flex items-center gap-3">
            <Logo src="/fastdrop-logo.png" />
          </div>

          <div className="hidden sm:flex items-center gap-6">

            <div className="flex items-center gap-4">
              <ProximityIndicator />
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />

              <Link
                href="https://www.github.com/abhisarxverma/fastdrop"
                target="_blank"
                className="
                  flex items-center justify-center
                  size-9
                  rounded-full
                  hover:bg-muted
                  transition-colors
                "
              >
                <FaGithub className="size-6 opacity-80 hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>

          <div className="sm:hidden flex items-center gap-2">
            <ThemeToggle />
          </div>

        </div>
      </Container>
    </header>
  );
}
