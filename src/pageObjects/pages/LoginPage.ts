import { BasePage, LoginLocator, step } from "@index";
import { expect, type Page } from "@playwright/test";

export class LoginPage extends BasePage {
  readonly locators: LoginLocator;

  constructor(page: Page) {
    super(page);
    this.locators = new LoginLocator(page);
  }

  @step("Navigate to login page")
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  @step((...args) => `Fill username > enter ${args[0]}`)
  async fillUsername(username: string): Promise<void> {
    await this.fillAndVerify(this.locators.usernameField, username);
  }

  @step("Fill password")
  async fillPassword(password: string): Promise<void> {
    await this.locators.passwordField.fill(password);
    await expect(this.locators.passwordField).toHaveAttribute("type", "password");
  }

  @step("Click login button")
  async clickLogin(): Promise<void> {
    await this.clickAndWait(this.locators.loginButton, true);
  }

  @step((...args) => `Login with credentials > login as ${args[0]}`)
  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  @step("Verify login page elements > all elements should be visible")
  async verifyLoginPageElements(): Promise<void> {
    await Promise.all([
      expect(this.locators.usernameField).toBeVisible(),
      expect(this.locators.passwordField).toBeVisible(),
      expect(this.locators.loginButton).toBeVisible(),
    ]);
  }

  @step("Verify login button is enabled")
  async verifyLoginButtonEnabled(): Promise<void> {
    await expect(this.locators.loginButton).toBeEnabled();
  }

  @step("Verify login button is disabled")
  async verifyLoginButtonDisabled(): Promise<void> {
    await expect(this.locators.loginButton).toBeDisabled();
  }

  @step((...args) => `Verify error message > should display "${args[0]}"`)
  async verifyErrorMessage(expectedText: string): Promise<void> {
    await expect(this.locators.errorMessage).toBeVisible();
    await expect(this.locators.errorMessage).toHaveText(expectedText);
  }
}
