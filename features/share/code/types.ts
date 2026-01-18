import { ShareInput } from "../common/types"

export type CodeShareServiceInput = ShareInput & {
    content: string,
    language: string
}