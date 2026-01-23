"use client";

import PageHeading from "@/app/web/_components/page-heading";
import PageShell from "@/app/web/_components/page-shell";
import { Button } from "@/components/ui/button";
import NoNearbyShares from "@/features/share/common/components/no-nearby-shares";
import SearchInput from "@/features/share/common/components/search-input";
import ShareTypeDropdownMenu from "@/features/share/common/components/share-type-dropdown-menu";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react"
import LinkShareModal from "@/features/share/link/components/link-share-modal";

export default function WebappPage() {

    const [ linkShareModalOpen, setLinkShareModalOpen ] = useState<boolean>(false);

    return (
        <PageShell addClassName="flex flex-col gap-3">
            <div className="page-heading-group">
                <PageHeading title="Nearby shares" />
                <p className="page-subheading">Public & Anonymous</p>
            </div>
            <div className="flex items-center justify-between gap-2">
                <SearchInput />
                <ShareTypeDropdownMenu setLinkShareModalOpen={setLinkShareModalOpen}>
                    <Button className="flex items-center">
                        <FaPlus />
                        Share
                    </Button>
                </ShareTypeDropdownMenu>
                <LinkShareModal open={linkShareModalOpen} setOpen={(val: boolean) => setLinkShareModalOpen(val)} />
            </div>
            <NoNearbyShares />
        </PageShell>
    )
}