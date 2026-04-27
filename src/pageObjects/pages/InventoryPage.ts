import { ROUTES } from "@constants/routes";
import { inventoryPageUrlRegex } from "@utils/CommonUtils";
import { BasePage, InventoryLocator, step } from "@index";
import { expect, type Page } from "@playwright/test";

/**
 * goto / add* / remove* / verify* ใช้กับ login และ cart — ควรคงให้ถูกต้อง
 * นักเรียนเติม: sortBy (และ locator ที่เกี่ยวใน InventoryLocator)
 */
export class InventoryPage extends BasePage {
  readonly locators: InventoryLocator;

  constructor(page: Page) {
    super(page);
    this.locators = new InventoryLocator(page);
  }

  @step("Navigate to inventory page")
  async goto(): Promise<void> {
    await this.page.goto(ROUTES.INVENTORY);
  }

  @step("Add first item to cart")
  async addFirstItemToCart(): Promise<void> {
    await this.locators.inventoryItem.addToCartButton.first().click();
  }

  @step((...args) => `Add item to cart by index > index ${args[0]}`)
  async addItemToCartByIndex(index: number): Promise<void> {
    await this.locators.inventoryItem.addToCartButton.nth(index).click();
  }

  @step((...args) => `Remove item from cart by index > index ${args[0]}`)
  async removeItemByIndex(index: number): Promise<void> {
    await this.locators.inventoryItem.removeButton.nth(index).click();
  }

  @step((...args) => `Sort items > ${args[0]}`)
  async sortBy(option: string): Promise<void> {
    await this.locators.sortDropdown.click();
    await this.locators.sortDropdown.selectOption(option);
  }

  @step("Verify inventory page is displayed")
  async verifyInventoryDisplayed(): Promise<void> {
    await expect(this.page).toHaveURL(inventoryPageUrlRegex);
    await expect(this.locators.inventoryList).toBeVisible();
  }

  @step((...args) => `Verify item count > should have ${args[0]} items`)
  async verifyItemCount(count: number): Promise<void> {
    await expect(this.locators.inventoryItem.name).toHaveCount(count);
  }

  @step((...args) => `Verify items are sorted correctly > first item should have ${args[0]} name`)
  async verifySortedItemsName(itemName: string): Promise<void> {
    await expect(this.locators.inventoryItem.name.first()).toHaveText(itemName);
  }
}
