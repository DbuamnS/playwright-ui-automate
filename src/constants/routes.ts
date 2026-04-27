/**
 * App path segments (relative to Playwright `baseURL`).
 * Single place to update when routes change.
 */
export const ROUTES = {
  HOME: "/",
  INVENTORY: "/inventory.html",
  CART: "/cart.html",
  CHECKOUT_STEP_TWO: "/checkout-step-two.html",
} as const;
