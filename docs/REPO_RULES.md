# Repository Rules

Single source of truth for how to work in this repository.

## 1) Tech stack and baseline

- Language: TypeScript
- Test runner: Playwright
- Pattern: Page Object Model (POM) with locator classes
- Reporting: Playwright default + HTML + JSON

## 2) What each key file is

### `playwright.config.ts`
- **What it is**: Playwright runner configuration.
- **Why it exists**: Controls discovery, retries, reporter, projects, and base runtime settings.
- **When to edit it**: Runner-level behavior changes.
- **Example change scenario**: Add additional browser project.
- **Common pitfalls**: Putting scenario logic in config.

### `src/plugins/globalSetup.ts`
- **What it is**: Env loader and global setup hook.
- **Why it exists**: Standard env bootstrap from `configs/.env.<ENV_NAME>`.
- **When to edit it**: Variable names/default/fallback logic changes.
- **Example change scenario**: Add optional `SLOWMO` behavior updates.
- **Common pitfalls**: Hardcoding secrets in code.

### `src/fixtures/test.ts`
- **What it is**: Shared fixture extension entry.
- **Why it exists**: Reuses POM objects across all specs.
- **When to edit it**: Add/remove fixture objects.
- **Example change scenario**: New shared component fixture.
- **Common pitfalls**: Writing business assertions in fixture setup.

### `index.ts`
- **What it is**: Central export barrel and `@step` decorator home.
- **Why it exists**: One import surface and consistent reusable symbols.
- **When to edit it**: Export surface changes.
- **Example change scenario**: Export new page object.
- **Common pitfalls**: Circular re-export chains.

### `src/constants/routes.ts`
- **What it is**: Route constants.
- **Why it exists**: Avoid duplicated route strings.
- **When to edit it**: Route changes.
- **Example change scenario**: Add checkout routes.
- **Common pitfalls**: Storing runtime/config data here.

### `src/utils/CommonUtils.ts`
- **What it is**: Generic reusable helpers.
- **Why it exists**: Centralize non-UI utility logic.
- **When to edit it**: New cross-feature helpers needed.
- **Example change scenario**: Add URL matcher helper.
- **Common pitfalls**: Adding page-specific business logic.

### `src/utils/ResourceLoader.ts`
- **What it is**: Resource loader (JSON + SQL) for `resources/` files.
- **Why it exists**: Consistent loading of test inputs, expected results, and optional SQL seed/cleanup scripts.
- **When to edit it**: Resource path/load behavior changes.
- **Example change scenario**: Add missing-file guard.
- **Common pitfalls**: Loading files outside `resources/` and turning it into a generic filesystem helper.

### `testCases/features/<domain>/*.spec.ts`
- **What it is**: Feature-oriented test specs.
- **Why it exists**: Domain ownership and easier filtering.
- **When to edit it**: Scenario additions/changes.
- **Example change scenario**: Add new auth edge case.
- **Common pitfalls**: Keeping `test.only` accidentally committed.

### `resources/dataTest/<domain>/*.json`
- **What it is**: Scenario input data.
- **Why it exists**: Keep inputs out of code.
- **When to edit it**: New test combinations.
- **Example change scenario**: Add new invalid credential set.
- **Common pitfalls**: Putting expected assertion strings here.

### `resources/expectedResult/<domain>/*.json`
- **What it is**: Assertion expected output.
- **Why it exists**: Single source of expected truth.
- **When to edit it**: UI copy/output changes.
- **Example change scenario**: Error text wording changes.
- **Common pitfalls**: Duplicating values in specs.

## 3) Folder structure rules

- `src/plugins/` - runtime plugin config (env loader, global setup)
- `src/fixtures/` - shared Playwright fixtures (`test.extend`)
- `src/pageObjects/base/` - base classes and shared page helpers
- `src/pageObjects/locators/` - locator classes only
- `src/pageObjects/pages/` - page action + verification methods
- `src/pageObjects/components/` - reusable UI components (header/nav/etc.)
- `src/constants/` - route/path constants and other static constants
- `src/utils/` - generic helpers (no UI logic)
- `resources/dataTest/` - input data for scenarios
- `resources/expectedResult/` - expected assertion values
- `testCases/features/` - spec files grouped by feature domain

## 4) Naming conventions

### File names

- Class files in `pageObjects`: `PascalCase.ts`
  - Example: `LoginPage.ts`, `InventoryLocator.ts`, `TopNav.ts`
- Non-class files: prefer `kebab-case` for specs/json/docs
  - Example: `login-to-inventory.spec.ts`
- Existing utility/class-style files in `src/utils/` may keep `PascalCase.ts`
- Resource files: `<domain>/<scenario>.json`

### Code identifiers (not file names)

- Use `camelCase` for variables, functions, and fixture names
  - Example: `loginPage`, `inventoryPage`, `addItemToCartByIndex`, `resource`
- Use `PascalCase` for class names (and types/interfaces)
  - Example: `LoginPage`, `InventoryLocator`, `BasePage`

### Spec names

- Use concise behavior names
- Avoid redundant prefixes like `Verify user can ...`
- Good: `Add single item`, `Invalid credentials shows error`

## 5) Source-of-truth rules for test values

- Never hardcode business expected text directly in spec files
- Put scenario input in `resources/dataTest/...`
- Put assertion expected values in `resources/expectedResult/...`
- Load JSON via `onTestDataLoader`

## 6) POM and locator rules

- One page class per page in `src/pageObjects/pages/`
- One locator class per page/component in `src/pageObjects/locators/`
- Keep locators out of spec files
- Page methods should describe user actions or verifications
- Avoid scenario-specific data inside page classes

## 7) Fixture rules

- Use `@fixtures/test` in all specs
- Add shared objects once in fixture, reuse everywhere
- Do not create duplicate page object instances in every test unless needed

## 8) `@step()` decorator rules

- Use `@step()` on important page/component methods for readable reports
- Dynamic step names are allowed when arguments matter
- Keep step names short and meaningful

## 9) Suite and tagging rules

- Spec grouping:
  - Group by feature/domain in `testCases/features/*`
  - Do not group by suite folder type
- Tags:
  - Type: `@smoke`, `@regression`
  - Priority: `@critical`, `@high`, `@medium`, `@low`
- Tag each test case with at least one type and one priority where applicable

## 10) Auth and environment rules

- Keep secrets out of git
- Env is loaded from `src/plugins/globalSetup.ts`
- Env file pattern: `configs/.env.<ENV_NAME>` (e.g. `.env.local`, `.env.stg`, `.env.prod`)
- Default env fallback: `ENV_NAME=local` when not provided
- Use `ENV_NAME=<name>` when running tests
- Keep env files for runtime/env secrets only; keep scenario data in `resources/*`

## 11) Quality gates before merge

Run all:

```bash
npm run typecheck
npm run lint
npm test
```

For focused runs:

```bash
npm run test:smoke
npm run test:regression
npm run test:critical
npm run test:high
npm run test:stg
npm run test:prod
```

## 11.1) Database integration rules (optional)

If you add DB assertions or DB setup/cleanup:

- Prefer **read-only queries** during tests.
- Only allow seed/cleanup when `DB_ALLOW_WRITE=true`.
- Tag DB-dependent tests with `@db` so they can be run separately.
- Never run destructive DB tests against production unless policy explicitly allows it and the account is read-only.

Example run:

```bash
playwright test --grep @db
```

### Supabase (read-only) rules

If you use Supabase from tests:

- Keep it **read-only** (query/assert). Prefer not to mutate data from UI suites.
- Store `SUPABASE_URL` / `SUPABASE_ANON_KEY` in `configs/.env.*` and **never commit real keys**.
- Tag Supabase tests with `@supabase` (and optionally `@db`) so they can be filtered independently.

## 12) Do / Don't checklist

### Do

- Keep specs focused on flow and assertions
- Keep data in resources
- Keep naming consistent
- Keep files small and feature-oriented

### Don't

- Mix old and new naming styles in the same area
- Duplicate expected strings across multiple specs
- Put business assertion data in code constants
- Create giant "common" files that hide feature intent

## 13) Scaling guidance

When a feature grows:

- Split by scenario file (`sorting`, `filtering`, `pagination`, etc.)
- Keep matching path between `dataTest` and `expectedResult`
- Consider one spec file per feature-scope
- Keep route strings in `src/constants/routes.ts`
- Keep reusable path/regex helpers in `src/utils/CommonUtils.ts`

Related docs:
- `docs/TEST_DATA_GUIDELINES.md`
- `docs/SCALABLE_STRUCTURE_REVIEW.md`
- `docs/ENVIRONMENT_GUIDE.md`
