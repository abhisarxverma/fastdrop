import { SHARE_TYPE } from "@/types";

export const ROUTES = {
  LANDING_PAGE: '/',
  HOME: '/web',
  NEW_OPEN_SHARE: (type: SHARE_TYPE) => `/web/open/share/${type}` as const,
  EDIT_OPEN_SHARE: (type: SHARE_TYPE, share_id: string) => `/web/open/edit/${type}/${share_id}` as const,
} as const;
