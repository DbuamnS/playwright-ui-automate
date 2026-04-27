import type { Locator, Page } from "@playwright/test";

export class CartLocator {
  constructor(private readonly page: Page) {}

  get cartList(): Locator {
    return this.page.locator('[data-test="cart-list"]');
  }

  get cartItems(): Locator {
    return this.page.locator('[data-test="inventory-item"]');
  }

  get cartItemQuantity(): Locator {
    return this.page.locator('[data-test="item-quantity"]');
  }

  get checkoutButton(): Locator {
    return this.page.locator('[data-test="checkout"]');
  }

  get continueShoppingButton(): Locator {
    return this.page.locator('[data-test="continue-shopping"]');
  }

  get itemNames(): Locator {
    return this.page.locator('[data-test="inventory-item-name"]');
  }
}
