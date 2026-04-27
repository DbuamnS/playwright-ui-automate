import { ROUTES } from "@constants/routes";
import { BasePage, step } from "@index";
import type { Page } from "@playwright/test";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  @step("Navigate to home page")
  async goto(): Promise<void> {
    await this.page.goto(ROUTES.HOME);
  }
}
