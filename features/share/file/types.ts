import { ShareInput } from "../common/types";

export type FileShareServiceInput = ShareInput & {
    file: File,
    file_type: string,
    file_name: string
}