import { test } from "@fixtures/test";
import { resource } from "@utils/ResourceLoader";
import { env } from "@plugins/globalSetup";

test.describe("Login", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto(env.BASE_URL);
  });

  const loginData = resource.readJson("resources/dataTest/auth/login.json") as any;
  const loginExpected = resource.readJson("resources/expectedResult/auth/login.json") as any;

  test.skip("Login with valid credentials", { tag: ["@smoke", "@critical"] }, async ({ loginPage, inventoryPage }) => {
    await loginPage.login(env.USERNAME, env.PASSWORD);
    await inventoryPage.verifyInventoryDisplayed();
  });

  test("Login page elements displayed correctly", { tag: ["@smoke", "@high"] }, async ({ loginPage }) => {
    await loginPage.verifyLoginPageElements();
  });

  test("Invalid credentials shows error", { tag: ["@smoke", "@high"] }, async ({ loginPage }) => {
    await loginPage.login(loginData.users.invalid.username, loginData.users.invalid.password);
    await loginPage.verifyErrorMessage(loginExpected.errors.invalidCredentials);
    await loginPage.verifyURL(env.BASE_URL);
  });

  test("Locked out user shows error", { tag: ["@smoke", "@high"] }, async ({ loginPage }) => {
    await loginPage.login(loginData.users.lockedOut.username, loginData.users.lockedOut.password);
    await loginPage.verifyErrorMessage(loginExpected.errors.lockedOut);
    await loginPage.verifyURL(env.BASE_URL);
  });

  test("Empty username shows error", { tag: ["@smoke", "@medium"] }, async ({ loginPage }) => {
    await loginPage.login(loginData.emptyCases.username, loginData.users.validFallback.password);
    await loginPage.verifyErrorMessage(loginExpected.errors.usernameRequired);
    await loginPage.verifyURL(env.BASE_URL);
  });

  test("Empty password shows error", { tag: ["@smoke", "@medium"] }, async ({ loginPage }) => {
    await loginPage.login(loginData.users.validFallback.username, loginData.emptyCases.password);
    await loginPage.verifyErrorMessage(loginExpected.errors.passwordRequired);
    await loginPage.verifyURL(env.BASE_URL);
  });
});
