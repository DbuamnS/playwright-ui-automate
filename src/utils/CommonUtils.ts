/**
 * Shared utility helpers for general/common use.
 */
import { ROUTES } from "@constants/routes";

export function escapePathForRegex(path: string): string {
  return path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Matches URL ending with the inventory path (for assertions). */
export const inventoryPageUrlRegex = new RegExp(`${escapePathForRegex(ROUTES.INVENTORY)}$`);
