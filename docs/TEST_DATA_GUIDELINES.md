# Test Data Guidelines

Guidelines for deciding where test values should live under `resources/*`.

## What each file is

### `resources/dataTest/<domain>/<scenario>.json`
- **What it is**: Input/scenario data for test execution.
- **Why it exists**: Keeps test code independent from changing input permutations.
- **When to edit it**: New user/item/sort/input combinations needed.
- **Example change scenario**: Add new invalid credential variant.
- **Common pitfalls**: Placing expected assertion text here.

### `resources/expectedResult/<domain>/<scenario>.json`
- **What it is**: Expected values for assertions.
- **Why it exists**: Central expected truth used by multiple tests.
- **When to edit it**: Product copy/output changes.
- **Example change scenario**: Error wording changed by product team.
- **Common pitfalls**: Duplicating these values directly in spec files.

### `src/utils/ResourceLoader.ts`
- **What it is**: Resource file loader (JSON + SQL) for files under `resources/`.
- **Why it exists**: Standardized file-path and parse behavior for test resources.
- **When to edit it**: Resource location or loader logic changes.
- **Example change scenario**: Add file-not-found diagnostics or stricter JSON parsing errors.
- **Common pitfalls**: Loading files outside the `resources` contract.

### `testCases/features/<domain>/<scenario>.spec.ts`
- **What it is**: Consumer of `dataTest` and `expectedResult`.
- **Why it exists**: Keeps specs focused on flow, not hardcoded values.
- **When to edit it**: Scenario flow/assertion logic changes.
- **Example change scenario**: Add new assertion step using existing expected data.
- **Common pitfalls**: Writing one-off expected strings inline.

## Rule of thumb

- Put **business test data** in `resources/dataTest/<domain>/*.json`.
- Put **expected assertions** in `resources/expectedResult/<domain>/*.json`.

## Folder responsibilities

### `resources/dataTest`

Use for test inputs and scenario data, for example:

- usernames/password combinations
- item indexes used in a flow
- sort options used by a specific scenario
- API request payload samples for tests

### `resources/expectedResult`

Use for expected values asserted by tests, for example:

- error messages
- expected item counts
- expected first item after sorting
- expected URLs/titles/messages

## Do / Don’t

### Do

- Keep test input and expected output in JSON under `resources`.
- Name files by domain + scenario: `auth/login.json`, `inventory/sorting.json`, `cart/add-remove.json`.
- Keep JSON flat and readable; nest only when needed.
- Reuse loader utility (`onTestDataLoader`) in test files.
  - Current standard: `resource.readJson(\"resources/dataTest/<domain>/<scenario>.json\")`

### Don’t

- Hardcode expected messages directly in spec files.
- Mix business expected values back into spec files.
- Put one-off random values in constants.

## Naming convention

- `resources/dataTest/<domain>/<feature>.json`
- `resources/expectedResult/<domain>/<feature>.json`
- `testCases/features/<domain>/<feature>.spec.ts`

## Review checklist

Before merging:

- Is test input in `resources/dataTest`?
- Is expected assertion data in `resources/expectedResult`?
- Did we avoid hardcoded business text in spec files?
- Is each data file placed in the correct `<domain>` folder?
