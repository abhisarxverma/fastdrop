import { ShareInput } from "../common/types";

export type LinkShareServiceInput = ShareInput & {
    content: string;
}

export type Preview = {
  image: string | null,
  title: string,
  description: string,
  url: string
}

export type MetadataResponse =
  | { status: "ok"; data: Preview | null, message: string }
  | { status: "unsafe"; message: string }
  | { status: "no-metadata"; message: string }
  | { status: "blocked"; message: string }
  | { status: "error"; message: string }