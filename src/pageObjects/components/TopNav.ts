import { BasePage, TopNavLocator, step } from "@index";
import { expect, type Page } from "@playwright/test";

export class TopNav extends BasePage {
  readonly locators: TopNavLocator;

  constructor(page: Page) {
    super(page);
    this.locators = new TopNavLocator(page);
  }

  @step("Open cart")
  async openCart(): Promise<void> {
    await this.clickAndWait(this.locators.cartLink, true);
  }

  @step("Open menu")
  async openMenu(): Promise<void> {
    await this.locators.menuButton.click();
  }

  // Verifications

  @step((...args) => `Verify cart badge > should display "${args[0]}"`)
  async verifyCartBadge(expectedText: string): Promise<void> {
    await expect(this.locators.cartBadge).toHaveText(expectedText);
  }

  @step("Verify cart badge is not visible")
  async verifyCartBadgeHidden(): Promise<void> {
    await expect(this.locators.cartBadge).toBeHidden();
  }
}
