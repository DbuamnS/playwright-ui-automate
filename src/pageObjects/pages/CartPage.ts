import { ROUTES } from "@constants/routes";
import { BasePage, CartLocator, step } from "@index";
import { expect, type Page } from "@playwright/test";

export class CartPage extends BasePage {
  readonly locators: CartLocator;

  constructor(page: Page) {
    super(page);
    this.locators = new CartLocator(page);
  }

  @step("Navigate to cart page")
  async goto(): Promise<void> {
    await this.page.goto(ROUTES.CART);
  }

  @step("Click checkout button")
  async clickCheckout(): Promise<void> {
    await this.clickAndWait(this.locators.checkoutButton, true);
  }

  @step("Click continue shopping")
  async clickContinueShopping(): Promise<void> {
    await this.clickAndWait(this.locators.continueShoppingButton, true);
  }

  // Verifications

  @step((...args) => `Verify cart item count > should have ${args[0]} items`)
  async verifyCartItemCount(count: number): Promise<void> {
    await expect(this.locators.cartItems).toHaveCount(count);
  }

  @step("Verify cart is empty")
  async verifyCartIsEmpty(): Promise<void> {
    await expect(this.locators.cartItems).toHaveCount(0);
  }
}
