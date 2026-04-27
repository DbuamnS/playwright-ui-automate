import { step } from "@index";
import { expect, type Locator, type Page } from "@playwright/test";

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  protected getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  @step("Wait for page to load completely")
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
  }

  protected async clickAndWait(locator: Locator, waitForNavigation = false): Promise<void> {
    if (waitForNavigation) {
      await Promise.all([this.page.waitForLoadState("networkidle"), locator.click()]);
    } else {
      await locator.click();
    }
  }

  protected async fillAndVerify(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
    await expect(locator).toHaveValue(value);
  }

  @step((...args) => `Verify URL > should be ${args[0]}`)
  async verifyURL(expectedUrl: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(expectedUrl);
  }

  @step("Clear all cookies")
  async clearCookies(): Promise<void> {
    await this.page.context().clearCookies();
  }

  @step((...args) => `Clear all cookies and goto URL > ${args[0]}`)
  async clearCookiesAndGoto(url: string): Promise<void> {
    await this.clearCookies();
    await this.page.goto(url);
  }
}
