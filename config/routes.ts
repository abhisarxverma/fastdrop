import { SHARE_ITEM_TYPE } from "@/types";
import { Route } from "next";

export const ROUTES = {
  LANDING_PAGE: '/',
  HOME: '/web',
  NEW_OPEN_SHARE: (type: SHARE_ITEM_TYPE) => `/web/open/share/${type}` as Route,
  VIEW_SHARE: (shareId: string) => `/web/open/share/${shareId}` as Route,
  EDIT_OPEN_SHARE: (type: SHARE_ITEM_TYPE, share_id: string) => `/web/open/edit/${type}/${share_id}` as Route,
} as const;
