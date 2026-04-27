# Scalable Structure Review

Recommended structure when this automation project grows to many features.

## What each file is (scaling view)

### `testCases/features/<domain>/*.spec.ts`
- **What it is**: Domain-owned spec files.
- **Why it exists**: Reduces merge conflicts and clarifies team ownership.
- **When to edit it**: Add or split scenarios by feature growth.
- **Example change scenario**: Split `inventory.spec.ts` into `sorting.spec.ts` and `filtering.spec.ts`.
- **Common pitfalls**: Packing too many scenarios into one large spec.

### `resources/dataTest/<domain>/*.json`
- **What it is**: Growth-safe test input catalog.
- **Why it exists**: Prevents scenario explosion in code.
- **When to edit it**: New permutations/edge cases.
- **Example change scenario**: Add pagination inputs under inventory.
- **Common pitfalls**: Unstructured mega JSON file across unrelated scenarios.

### `resources/expectedResult/<domain>/*.json`
- **What it is**: Expected outcome catalog by scenario.
- **Why it exists**: Keeps assertions maintainable when output changes.
- **When to edit it**: UI/result changes.
- **Example change scenario**: New expected totals after pricing update.
- **Common pitfalls**: Missing 1:1 mapping to `dataTest` paths.

### `src/pageObjects/{pages,components,locators}`
- **What it is**: Reusable UI abstraction layer.
- **Why it exists**: Keeps selectors and UI interactions centralized.
- **When to edit it**: UI component changes or reusable action changes.
- **Example change scenario**: Navbar cart behavior changed for all pages.
- **Common pitfalls**: Putting feature-specific test assertions inside shared components.

### `docs/REPO_RULES.md`
- **What it is**: Operational rulebook.
- **Why it exists**: Keeps scale decisions aligned across contributors.
- **When to edit it**: Team standards evolve.
- **Example change scenario**: Add new split thresholds.
- **Common pitfalls**: Updating structure without updating rules.

## Current status (good)

- `pageObjects` already split by `base / locators / pages / components`
- `testCases/features` already split by domain/feature
- test data and expected assertions are already separated under `resources`

## Target structure for many features

Use **feature-first** naming and grouping, and filter execution by tags.

```text
resources/
  dataTest/
    auth/
      login.json
      logout.json
    inventory/
      sorting.json
      filtering.json
    cart/
      add-remove.json
  expectedResult/
    auth/
      login.json
      logout.json
    inventory/
      sorting.json
      filtering.json
    cart/
      add-remove.json

testCases/
  features/
    auth/
      login.spec.ts
      login-to-inventory.spec.ts
    inventory/
      inventory.spec.ts
    cart/
      add-to-cart.spec.ts
```

## Design principles

1. **Single source of truth for test values**
   - Never duplicate expected text in spec files.
   - Keep scenario inputs in `resources/dataTest`.
   - Keep assertions in `resources/expectedResult`.

2. **Feature names first, run control by tags**
   - Feature should be obvious in file names.
   - Use tags (`@smoke`, `@regression`, `@critical`, `@high`, etc.) for execution filters.

3. **Keep page objects reusable**
   - Page methods should represent user actions and verifications.
   - Avoid embedding scenario-specific business values in page classes.

4. **Limit one spec file to one feature scope**
   - Easier maintenance and ownership when feature expands.

## When to split a feature into more files

Split when one of these is true:

- spec file exceeds ~250 lines
- data JSON exceeds ~150 lines
- feature has more than 8-10 scenarios
- multiple teams edit the same file often

## Suggested next step (optional)

For large suites, keep domain + scenario naming consistent:

- `resources/dataTest/auth/login.json`
- `resources/dataTest/inventory/sorting.json`
- `resources/dataTest/cart/add-remove.json`

Mirror the same path under `expectedResult`.
