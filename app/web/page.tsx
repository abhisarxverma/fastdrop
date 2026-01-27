"use client";

import PageHeading from "@/app/web/_components/page-heading";
import PageShell from "@/app/web/_components/page-shell";
import { Button } from "@/components/ui/button";
import SearchInput from "@/features/new-share/common/components/search-input";
import ShareTypeDropdownMenu from "@/features/new-share/common/components/share-type-dropdown-menu";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react"
import LinkShareModal from "@/features/new-share/link/components/link-share-modal";
import SharesGrid from "@/app/web/_components/shares-grid";

export default function WebappPage() {

    const [ linkShareModalOpen, setLinkShareModalOpen ] = useState<boolean>(false);

    return (
        <PageShell addClassName="flex flex-col gap-3">
            <div className="page-heading-group">
                <PageHeading title="Shared near you" />
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
            <SharesGrid />
        </PageShell>
    )
}