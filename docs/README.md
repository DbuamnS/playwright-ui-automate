## docs

This folder contains onboarding and operating documentation for the repository.

## What each file is

### `docs/README.md`
- **What it is**: Entry page for documentation navigation.
- **Why it exists**: Helps new contributors start from the correct deep-dive guide.
- **When to edit it**: Add/remove doc files or change recommended reading order.
- **Example change scenario**: Add a new `docs/REPORTING_GUIDE.md` and link it here.
- **Common pitfalls**: Letting this file go stale after moving docs.

### `docs/REPO_RULES.md`
- **What it is**: Repository standards and conventions source of truth.
- **Why it exists**: Keeps coding/testing structure and naming consistent.
- **When to edit it**: Team conventions change.
- **Example change scenario**: Introduce new tag policy (`@security`).
- **Common pitfalls**: Adding conflicting rules that disagree with other docs.

### `docs/TEST_DATA_GUIDELINES.md`
- **What it is**: Rules for `resources/dataTest` and `resources/expectedResult` ownership.
- **Why it exists**: Prevents mixing business data and expected outputs.
- **When to edit it**: Data folder strategy or naming conventions evolve.
- **Example change scenario**: Introduce new domain folder conventions.
- **Common pitfalls**: Defining env-secrets guidance here (belongs in environment guide).

### `docs/SCALABLE_STRUCTURE_REVIEW.md`
- **What it is**: Growth roadmap for larger suites.
- **Why it exists**: Shows how to scale structure and split files by feature/scenario.
- **When to edit it**: Team starts hitting scale pain points.
- **Example change scenario**: Add threshold for splitting fixtures/modules.
- **Common pitfalls**: Treating this doc as immediate hard rules instead of scalable guidance.

### `docs/ENVIRONMENT_GUIDE.md`
- **What it is**: Multi-environment run and env-file guide.
- **Why it exists**: Makes `ENV_NAME` usage consistent across local/CI.
- **When to edit it**: New env names, variables, or scripts.
- **Example change scenario**: Add `uat` environment and related scripts.
- **Common pitfalls**: Documenting test case business data as env settings.

## Suggested reading order

1. `README.md`
2. `docs/REPO_RULES.md`
3. `docs/TEST_DATA_GUIDELINES.md`
4. `docs/ENVIRONMENT_GUIDE.md`
5. `docs/SCALABLE_STRUCTURE_REVIEW.md`
