import { ShareInput } from "../common/types"

export type TextShareServiceInput = ShareInput & { 
    content: string,
    file_name: string
}