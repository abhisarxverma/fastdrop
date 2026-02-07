"use client";

import { AppFooter } from "@/components/web/layout/app-footer";
import DashboardToolbar from "@/components/web/sessions/dashboard-toolbar";
import { SessionList } from "@/components/web/sessions/sessions-list";
import { useState } from "react";

export default function NearbySessionsPage() {

  const [ view, setView ] = useState<"rows" | "grid">("rows");
  const [ searchInput, setSearchInput ] = useState<string>("");

  return (
    <main className="flex-1 flex flex-col py-6 sm:py-8 md:py-10">
      <div className="flex-1 flex flex-col gap-8">
        <section className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Sessions near you
          </h1>
          <p className="text-sm sm:text-base md:text-md text-muted-foreground">
            Join a session or start one.
          </p>
        </section>

        <DashboardToolbar searchInput={searchInput} onSearchInputChange={setSearchInput} view={view} onViewChange={setView} />

        <SessionList searchInput={searchInput} view={view} />
      </div>

      <AppFooter />
    </main>
  );
}
