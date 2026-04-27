import { test, expect } from "@fixtures/test";
import { resource } from "@utils/ResourceLoader";
import { env } from "@plugins/globalSetup";

test.describe("Login to inventory", () => {
  const loginData = resource.readJson("resources/dataTest/auth/login.json") as any;
  const loginExpected = resource.readJson("resources/expectedResult/auth/login.json") as any;
  const inventoryExpected = resource.readJson("resources/expectedResult/inventory/sorting.json") as any;
  const cartExpected = resource.readJson("resources/expectedResult/cart/add-remove.json") as any;

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto(env.BASE_URL);
  });

  test("Login, view inventory, and add item to cart", { tag: ["@smoke", "@critical"] }, async ({
    loginPage,
    inventoryPage,
    topNav,
    cartPage,
  }) => {
    await loginPage.login(env.USERNAME, env.PASSWORD);

    await inventoryPage.verifyInventoryDisplayed();
    await inventoryPage.verifyItemCount(inventoryExpected.totalItems);
    await inventoryPage.addFirstItemToCart();

    await topNav.verifyCartBadge("1");
    await topNav.openCart();
    await cartPage.verifyCartItemCount(cartExpected.itemCounts.single);
  });

  test("Locked out user cannot access inventory", { tag: ["@regression", "@high"] }, async ({ loginPage }) => {
    await loginPage.login(loginData.users.lockedOut.username, loginData.users.lockedOut.password);

    await loginPage.verifyErrorMessage(loginExpected.errors.lockedOut);
    await loginPage.verifyURL(env.BASE_URL);
  });

  test("Wrong password stays on login page", { tag: ["@regression", "@high"] }, async ({ loginPage }) => {
    await loginPage.login(loginData.users.invalid.username, loginData.users.invalid.password);

    await loginPage.verifyErrorMessage(loginExpected.errors.invalidCredentials);
    await loginPage.verifyURL(env.BASE_URL);
  });
});
