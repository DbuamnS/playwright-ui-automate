import { test } from "@fixtures/test";
import { readJson } from "@index";
import { env } from "@plugins/globalSetup";

const dataTest = readJson("resources/dataTest/inventory/sorting.json") as any;
const expectedResults = readJson("resources/expectedResult/inventory/sorting.json") as any;

test.describe("Inventory", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto(env.BASE_URL);
    await loginPage.login(env.USERNAME, env.PASSWORD);
  });

  test("Display all 6 items", { tag: ["@smoke", "@high"] }, async ({ inventoryPage }) => {
    await inventoryPage.goto();
    await inventoryPage.verifyItemCount(expectedResults.totalItems);
  });

  test.fixme("Sort by name A-Z", { tag: ["@smoke", "@medium"] }, async ({ inventoryPage }) => {
    await inventoryPage.goto();
    await inventoryPage.sortBy(dataTest.sortOptions.nameAsc);
    await inventoryPage.verifySortedItemsName(expectedResults.firstItemByNameAsc);
  });

  test("Sort by price low to high", { tag: ["@smoke", "@medium"] }, async ({ inventoryPage }) => {
    await inventoryPage.goto();
    await inventoryPage.sortBy(dataTest.sortOptions.priceAsc);
    await inventoryPage.verifySortedItemsName(expectedResults.firstItemByPriceAsc);
  });

  test("Cannot access without login", { tag: ["@smoke", "@high"] }, async ({ inventoryPage }) => {
    await inventoryPage.clearCookies();
    await inventoryPage.goto();
    await inventoryPage.verifyURL(env.BASE_URL);
  });
});
