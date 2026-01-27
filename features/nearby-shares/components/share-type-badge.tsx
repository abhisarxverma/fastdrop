
import { Badge } from "@/components/ui/badge";
import { NearbyShare } from "../types";
import { fileTypes } from "@/features/new-share/common/constants/file-type-info";
import { isFileShareItem, isTextShareItem, isLinkShareItem, isCodeShareItem } from "../lib/type-guards";
import {
    HiOutlineLink,
} from "react-icons/hi2";
import { getLanguageInfo } from "@/features/new-share/common/utils";
import { getSingleItem, toDomainItem } from "../lib/helpers";

export default function ShareTypeBadge({ share }: { share: NearbyShare }) {
    const rawItem = getSingleItem(share);
    const shareItem = toDomainItem(rawItem);
    if (!shareItem) return null;
    if (isFileShareItem(shareItem)) {
        const fileInfo = fileTypes[shareItem.file_type];
        return <TypeBadge>{<fileInfo.icon />} {fileInfo.name}</TypeBadge>;
    }

    if (isTextShareItem(shareItem)) {
        const fileInfo = fileTypes["txt"];
        return <TypeBadge>{<fileInfo.icon />} {fileInfo.name}</TypeBadge>;
    }

    if (isLinkShareItem(shareItem)) {
        return <TypeBadge><HiOutlineLink /> Link</TypeBadge>;
    }

    if (isCodeShareItem(shareItem)) {
        const languageInfo = getLanguageInfo(shareItem.language)
        return (
            <TypeBadge>
                {<languageInfo.icon />}
                {languageInfo.name} code
            </TypeBadge>
        )
    }

    return null;
}

function TypeBadge({ children }: { children: React.ReactNode }) {
    return (
        <Badge variant="outline">
            { children }
        </Badge>
    )
}