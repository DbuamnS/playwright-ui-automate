import test from "@playwright/test";

// Base
export { BasePage } from "@pageObjects/base/BasePage";

// Locators
export { LoginLocator } from "@pageObjects/locators/LoginLocator";
export { InventoryLocator } from "@pageObjects/locators/InventoryLocator";
export { CartLocator } from "@pageObjects/locators/CartLocator";
export { TopNavLocator } from "@pageObjects/locators/TopNavLocator";
export { CheckoutLocator } from "@pageObjects/locators/CheckoutLocator";

// Components
export { TopNav } from "@pageObjects/components/TopNav";

// Pages
export { HomePage } from "@pageObjects/pages/HomePage";
export { LoginPage } from "@pageObjects/pages/LoginPage";
export { InventoryPage } from "@pageObjects/pages/InventoryPage";
export { CartPage } from "@pageObjects/pages/CartPage";
export { CheckoutPage } from "@pageObjects/pages/CheckoutPage"

// Utils
export { onDataUtils } from "@utils/DataUtils";
export { escapePathForRegex } from "@utils/CommonUtils";
export { resource, readJson, readSql } from "@utils/ResourceLoader";

// Routes
export { ROUTES } from "@constants/routes";
export { inventoryPageUrlRegex } from "@utils/CommonUtils";

/**
 * Decorator that wraps a POM method in `test.step()` for clearer reports.
 *
 * Usage:
 *   @step()                                          — uses method name
 *   @step("Click login button")                      — static name
 *   @step((...args) => `Fill username > ${args[0]}`) — dynamic name
 */
export function step(stepName?: string | ((...args: any[]) => string)) {
  return function decorator(target: Function, context: ClassMethodDecoratorContext) {
    return async function replacementMethod(this: any, ...args: any[]) {
      let name: string;
      if (typeof stepName === "function") {
        name = stepName(...args);
      } else {
        name = stepName || `${context.name as string} (${this.constructor.name})`;
      }

      // `test.step()` is only available in an active Playwright test context.
      // For global setup/teardown or utility execution, run the method directly.
      try {
        test.info();
      } catch {
        return await target.call(this, ...args);
      }

      return await test.step(name, async () => {
        return await target.call(this, ...args);
      });
    };
  };
}
