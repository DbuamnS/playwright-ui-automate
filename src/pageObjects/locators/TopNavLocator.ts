import type { Locator, Page } from "@playwright/test";

export class TopNavLocator {
  constructor(private readonly page: Page) {}

  get cartLink(): Locator {
    return this.page.locator('[data-test="shopping-cart-link"]');
  }

  get cartBadge(): Locator {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }

  get menuButton(): Locator {
    return this.page.locator('[data-test="open-menu"]');
  }
}
