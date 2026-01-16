"use client";

import PageHeading from "@/app/web/_components/page-heading";
import PageShell from "@/app/web/_components/page-shell";
import { Button } from "@/components/ui/button";
import NoNearbyShares from "@/features/share/components/no-nearby-shares";
import SearchInput from "@/features/share/components/search-input";

export default function WebappPage() {

    return(
        <PageShell addClassName="flex flex-col gap-3">
            <div className="page-heading-group">
                <PageHeading title="Nearby shares" />
                <p className="page-subheading">Shares will appear in realtime</p>
            </div>
            <div className="flex items-center justify-between gap-2">
                <SearchInput />
                <Button>Share</Button>
            </div>
            <NoNearbyShares />
        </PageShell>
    )
}