# Playwright UI Automation Template

Reusable **Playwright + TypeScript** UI automation project template.

## Requirements

- Node.js 18+

## Quick start

```bash
npm install
npx playwright install

# Run tests (default: ENV_NAME=local)
npm run test:local
```

## Common commands

```bash
npm test
npm run test:local
npm run test:stg
npm run test:prod
npm run test:ui
npm run test:headed
npm run test:smoke
npm run test:regression
npm run test:critical
npm run test:high
npm run report
```

Run one file:

```bash
npm run test:local -- testCases/features/auth/login.spec.ts
```

## Project layout

```text
index.ts                          # barrel re-export + @step decorator
src/
  plugins/                        # env loading + global setup entry
  constants/                      # static paths and constants
  fixtures/                       # test.extend() shared fixtures
  pageObjects/
    base/BasePage.ts              # abstract base with common helpers
    locators/                     # locator classes (getters per element)
    pages/                        # page objects (extends BasePage)
    components/                   # shared UI components (extends BasePage)
  utils/                          # general-purpose utilities
resources/
  dataTest/                       # scenario input data (JSON)
  expectedResult/                 # assertion expected data (JSON)
testCases/
  features/                       # specs grouped by feature/domain
configs/                          # .env.local / .env.stg / .env.prod
```

## What each file is

### `README.md`
- **What it is**: Primary onboarding page for anyone opening the repository.
- **Why it exists**: Gives fast setup/run commands and points people to deeper docs.
- **When to edit it**: Any time commands, folder structure, or entry workflow changes.
- **Example change scenario**: You add a new `npm run test:security` script and include it here.
- **Common pitfalls**: Forgetting to update this file after changing scripts in `package.json`.

### `index.ts`
- **What it is**: Barrel export and shared decorator (`@step`) entry point.
- **Why it exists**: Keeps imports consistent (`@index`) and centralizes reusable exports.
- **When to edit it**: New reusable classes/utilities or export path changes.
- **Example change scenario**: Add a new `CheckoutPage` export for test consumption.
- **Common pitfalls**: Exporting internal-only helpers and creating circular imports.

### `playwright.config.ts`
- **What it is**: Global Playwright runtime configuration.
- **Why it exists**: Defines test discovery, reporters, projects, retries, and shared `use` options.
- **When to edit it**: Changing runner behavior, browser projects, or default timeouts.
- **Example change scenario**: Add Firefox project or modify reporter output.
- **Common pitfalls**: Hardcoding environment-specific values that should come from env files.

### `src/plugins/globalSetup.ts`
- **What it is**: Environment bootstrap (loads `configs/.env.<ENV_NAME>`) and global setup hook.
- **Why it exists**: Single source for runtime environment loading.
- **When to edit it**: Env variable names, fallback behavior, setup bootstrap flow changes.
- **Example change scenario**: Add `API_BASE_URL` for API-driven checks.
- **Common pitfalls**: Moving test scenario data into env (should stay in `resources/`).

### `src/fixtures/test.ts`
- **What it is**: Shared fixture extension for reusable page objects.
- **Why it exists**: Avoids repeated object setup in every spec.
- **When to edit it**: Add/remove page objects or shared fixtures.
- **Example change scenario**: Register `CheckoutPage` fixture for checkout tests.
- **Common pitfalls**: Putting business test logic inside fixture setup.

### `src/constants/routes.ts`
- **What it is**: Central route/path constants.
- **Why it exists**: Prevents duplicated string literals like `/inventory.html`.
- **When to edit it**: Route path changes or new route constants needed.
- **Example change scenario**: Add `/checkout-step-one.html` route constant.
- **Common pitfalls**: Mixing dynamic runtime data into constants.

### `src/utils/ResourceLoader.ts`
- **What it is**: Resource file loader (JSON + SQL) for files under `resources/`.
- **Why it exists**: Keeps specs clean and consistent when reading test data/expected values (and DB SQL examples).
- **When to edit it**: Data path conventions or loader behavior changes.
- **Example change scenario**: Add better error handling when a resource file is missing.
- **Common pitfalls**: Loading non-resource files and blurring data ownership.

### `testCases/features/*/*.spec.ts`
- **What it is**: Feature-based executable test cases.
- **Why it exists**: Organizes scenarios by domain (`auth`, `inventory`, `cart`).
- **When to edit it**: Add/modify scenarios, tags, or assertions.
- **Example change scenario**: Add new `inventory/filtering.spec.ts` for filter behavior.
- **Common pitfalls**: Embedding locator selectors directly instead of using page objects.

### `resources/dataTest/*/*.json`
- **What it is**: Input/scenario data files.
- **Why it exists**: Keeps test inputs outside code for maintainability.
- **When to edit it**: New or updated test input permutations.
- **Example change scenario**: Add alternate user dataset for login paths.
- **Common pitfalls**: Storing expected assertion values here (they belong in `expectedResult`).

### `resources/expectedResult/*/*.json`
- **What it is**: Expected values used in assertions.
- **Why it exists**: Keeps assertion truth-source centralized.
- **When to edit it**: UI text or expected behavior output changes.
- **Example change scenario**: Update error message after product copy update.
- **Common pitfalls**: Duplicating the same expected text directly in spec files.

## Key patterns

- **Locator classes**: each page has a `*Locator` class with `get` accessors
- **Page Object**: each page `extends BasePage`, holds `readonly locators`
- **`@step()` decorator**: wraps POM methods in `test.step()` for clear reports
- **Barrel `index.ts`**: import everything from `@index`
- **Routes constants**: keep path strings in `src/constants/routes.ts`
- **Test data separation**: input/expected data are loaded from `resources/*`
- **Test tags**: `@smoke`, `@regression`, `@critical`, `@high`, `@medium`, `@low`

## Environment usage

Env is loaded from `src/plugins/globalSetup.ts` using:

- `ENV_NAME=local` -> `configs/.env.local`
- `ENV_NAME=stg` -> `configs/.env.stg`
- `ENV_NAME=prod` -> `configs/.env.prod`

If not provided, default is `local`.

See also:
- `docs/README.md`
- `docs/REPO_RULES.md`
- `docs/TEST_DATA_GUIDELINES.md`
- `docs/ENVIRONMENT_GUIDE.md`
