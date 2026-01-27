
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { timeAgo } from "@/lib/utils/formatters"
import ShareTypeBadge from "./share-type-badge"
import { ROUTES } from "@/config/routes"
import { MdOutlineFileDownload } from "react-icons/md"
import type { NearbyShare } from "../types"

type SingleShareCardProps = {
  share: NearbyShare
}

export default function SingleShareCard({ share }: SingleShareCardProps) {
  const hasFile = Boolean(share.share_items[0].file_path)

  return (
    <Link
      href={ROUTES.VIEW_SHARE(share.id)}
      className="group block focus:outline-none"
    >
      <Card
        className="
          relative
          w-full
          cursor-pointer
          border
          p-4
          transition
          hover:border-primary/50
          hover:shadow-sm
        "
      >
        <h3 className="text-sm font-medium leading-snug line-clamp-2">
          {share.title}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <ShareTypeBadge share={share} />
          <span className="text-xs text-muted-foreground">
            {timeAgo(share.created_at)}
          </span>
        </div>

        {hasFile && (
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              // TODO: trigger signed URL download
            }}
            className="
              absolute
              bottom-3
              right-3
              rounded-md
              p-2
              text-muted-foreground
              opacity-0
              transition
              hover:bg-muted
              hover:text-foreground
              group-hover:opacity-100
            "
            aria-label="Download file"
          >
            <MdOutlineFileDownload size={18} />
          </button>
        )}
      </Card>
    </Link>
  )
}
