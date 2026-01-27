import { ShareWithItems } from "@/types"
import { fileTypes } from "../new-share/common/constants/file-type-info";

// export type NearbyShare = Omit<ShareWithItems, "share_items"> & {
//   share_items: ShareItem[]
// };
export type NearbyShare = ShareWithItems;
export type NearbyShares = NearbyShare[];

export type BaseItem = {
  id: string;
  share_id: string;
  created_at: string;
};


export type FileShareItem = BaseItem & {
  item_type: "file";
  file_type: keyof typeof fileTypes;
  file_name: string;
  file_path: string;
};

export type CodeShareItem = BaseItem & {
  item_type: "code";
  content_text: string;
  file_name: string;
  language: string;
};

export type TextShareItem = BaseItem & {
  item_type: "text";
  content_text: string;
  file_name: string;
};

export type LinkShareItem = BaseItem & {
  item_type: "link";
  content_text: string;
};

export type ShareItem = FileShareItem | CodeShareItem | TextShareItem | LinkShareItem;
