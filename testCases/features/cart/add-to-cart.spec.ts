import { test, expect } from "@fixtures/test";
import { resource } from "@utils/ResourceLoader";
import { env } from "@plugins/globalSetup";
import { ROUTES } from "@constants/routes";

test.describe("Add to cart", () => {
  const cartData = resource.readJson("resources/dataTest/cart/add-remove.json") as any;
  const cartExpected = resource.readJson("resources/expectedResult/cart/add-remove.json") as any;

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto(env.BASE_URL);
    await loginPage.login(env.USERNAME, env.PASSWORD);
  });

  test("Add single item", { tag: ["@regression", "@high"] }, async ({ inventoryPage, topNav, cartPage }) => {
    await inventoryPage.addItemToCartByIndex(cartData.addIndexes.single[0]);

    await topNav.verifyCartBadge(cartData.expectedBadges.single);
    await topNav.openCart();
    await cartPage.verifyCartItemCount(cartExpected.itemCounts.single);
  });

  test("Add multiple items", { tag: ["@regression", "@high"] }, async ({ inventoryPage, topNav, cartPage }) => {
    for (const index of cartData.addIndexes.multiple) {
      await inventoryPage.addItemToCartByIndex(index);
    }

    await topNav.verifyCartBadge(cartData.expectedBadges.multiple);
    await topNav.openCart();
    await cartPage.verifyCartItemCount(cartExpected.itemCounts.multiple);
  });

  test.only("Remove item from inventory page", { tag: ["@regression", "@medium"] }, async ({ inventoryPage, topNav }) => {
    await inventoryPage.addItemToCartByIndex(cartData.addIndexes.single[0]);
    await topNav.verifyCartBadge(cartData.expectedBadges.single);

    await inventoryPage.removeItemByIndex(cartData.addIndexes.single[0]);
    await topNav.verifyCartBadgeHidden();
  });

  test.only("Cart is empty by default", { tag: ["@regression", "@medium"] }, async ({ topNav, cartPage }) => {
    await cartPage.goto();
    await cartPage.verifyCartItemCount(cartExpected.itemCounts.empty);
    await topNav.verifyCartBadgeHidden();
  });

  test.only("Continue shopping navigates back to inventory", { tag: ["@regression", "@low"] }, async ({ cartPage }) => {
    await cartPage.goto();
    await cartPage.clickContinueShopping();
    await cartPage.verifyURL(ROUTES.INVENTORY);
  });
});
