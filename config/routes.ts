
export const ROUTES = {
  LANDING_PAGE: '/',
  HOME: '/web',
  PRODUCT_DETAIL: (id: string) => `/products/${id}` as const,
  USER_PROFILE: (username: string) => `/users/${username}` as const,
} as const;
