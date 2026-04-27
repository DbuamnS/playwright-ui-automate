import type { Locator, Page } from "@playwright/test";

/**
 * ส่วนที่ login/cart ใช้ผ่าน InventoryPage: inventoryList, inventoryItem.name, addToCartButton, removeButton
 * นักเรียนเติม: image, description, price, sortDropdown (+ sortBy ใน InventoryPage)
 */
export class InventoryLocator {
  constructor(private readonly page: Page) {}

  get inventoryList(): Locator {
    return this.page.locator('[data-test="inventory-list"]');
  }

  get inventoryItem() {
    return {
      image: this.page.getByTestId("inventory_item_img"),
      name: this.page.locator('[data-test="inventory-item-name"]'),
      description: this.page.getByTestId("inventory-item-desc"),
      price: this.page.getByTestId("inventory-item-price"),
      addToCartButton: this.page.locator('[data-test^="add-to-cart-"]'),
      removeButton: this.page.locator('[data-test^="remove-"]'),
    };
  }

  get sortDropdown(): Locator {
    return this.page.getByTestId("product-sort-container");
  }
}
