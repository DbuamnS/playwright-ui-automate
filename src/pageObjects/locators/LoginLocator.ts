import type { Locator, Page } from "@playwright/test";

export class LoginLocator {
  constructor(private readonly page: Page) {}

  get usernameField(): Locator {
    return this.page.locator('[data-test="username"]');
  }

  get passwordField(): Locator {
    return this.page.locator('[data-test="password"]');
  }

  get loginButton(): Locator {
    return this.page.locator('[data-test="login-button"]');
  }

  get errorMessage(): Locator {
    return this.page.locator('[data-test="error"]');
  }
}
