"use client";

import PageHeading from "@/app/web/_components/page-heading";
import PageShell from "@/app/web/_components/page-shell";
import { Button } from "@/components/ui/button";
import NoNearbyShares from "@/features/share/components/no-nearby-shares";
import SearchInput from "@/features/share/components/search-input";
import ShareTypeDropdownMenu from "@/features/share/components/share-type-dropdown-menu";
import { FaPlus } from "react-icons/fa6";

export default function WebappPage() {

    return (
        <PageShell addClassName="flex flex-col gap-3">
            <div className="page-heading-group">
                <PageHeading title="Nearby shares" />
                <p className="page-subheading">Public & Anonymous</p>
            </div>
            <div className="flex items-center justify-between gap-2">
                <SearchInput />
                <ShareTypeDropdownMenu>
                    <Button className="flex items-center">
                        <FaPlus />
                        Share
                    </Button>
                </ShareTypeDropdownMenu>
            </div>
            <NoNearbyShares />
        </PageShell>
    )
}