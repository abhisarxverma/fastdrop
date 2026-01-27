import { Tables } from "@/types"

export type GetShareByIdServiceInput = {
    shareId: Tables<"shares">["id"]
}
