# Environment Guide

How to run this repository across multiple environments.

## What each file is

### `configs/.env.local`
- **What it is**: Local default env values.
- **Why it exists**: Developer-friendly default fallback.
- **When to edit it**: Local URL/credential changes for dev execution.
- **Example change scenario**: Point local runs to an internal staging mirror.
- **Common pitfalls**: Committing sensitive real credentials.

### `configs/.env.stg`
- **What it is**: Staging env values.
- **Why it exists**: Controlled shared environment configuration.
- **When to edit it**: Staging endpoint or creds rotation.
- **Example change scenario**: Update staging base URL after infra migration.
- **Common pitfalls**: Reusing production credentials.

### `configs/.env.prod`
- **What it is**: Production-target env values (if policy permits).
- **Why it exists**: Explicit prod run isolation.
- **When to edit it**: Prod endpoint/credential policy updates.
- **Example change scenario**: Set read-only account for smoke checks.
- **Common pitfalls**: Running destructive scenarios against prod.

### `src/plugins/globalSetup.ts`
- **What it is**: Env selector and loader using `ENV_NAME`.
- **Why it exists**: One consistent place to derive runtime env.
- **When to edit it**: Add new env names or variable mapping.
- **Example change scenario**: Add `uat` env fallback.
- **Common pitfalls**: Moving test case input data into env values.

### `playwright.config.ts`
- **What it is**: Runner config consuming env values.
- **Why it exists**: Applies env-driven baseURL and runtime options.
- **When to edit it**: Project/retry/reporter defaults change.
- **Example change scenario**: Tune timeouts for slower staging.
- **Common pitfalls**: Hardcoding environment values here.

### `package.json` scripts
- **What it is**: Standard commands to run target env quickly.
- **Why it exists**: Reduces manual env typing errors.
- **When to edit it**: Add/remove env-specific test commands.
- **Example change scenario**: Introduce `test:uat` command.
- **Common pitfalls**: Script names drifting from actual env files.

## 1) File naming

The loader reads one env file based on `ENV_NAME`:

- `configs/.env.local`
- `configs/.env.stg`
- `configs/.env.prod`

Recommended environment names:

- `local`
- `stg`
- `prod`

## 2) Required variables

Minimum variables expected by this project:

- `BASE_URL`
- `USERNAME` (optional for unauth flows, required for auth setup)
- `PASSWORD` (optional for unauth flows, required for auth setup)
- `SLOWMO` (optional)

### Optional DB variables (PostgreSQL example)

Used by the optional `@db` tests and DB helper utilities:

- `DB_HOST`
- `DB_PORT` (default `5432`)
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DB_SSL` (`true|false`)
- `DB_ALLOW_WRITE` (`true|false`, default `false`) — required for running seed/cleanup SQL

### Optional DB variables (Supabase example - read-only)

Used by optional `@supabase` tests for read/query assertions:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

## 3) Run commands

Use scripts:

- `npm run test:local`
- `npm run test:stg`
- `npm run test:prod`
- `npm run test:smoke:stg`
- `npm run test:smoke:prod`
- `npm run test:regression:stg`
- `npm run test:regression:prod`
- `npm run test:critical`
- `npm run test:high`

Or pass directly:

```bash
ENV_NAME=stg npm test
ENV_NAME=prod npm run test:smoke
```

## 4) What goes in env vs resources

Put in env files:

- environment URL (`BASE_URL`)
- credentials per environment (`USERNAME`, `PASSWORD`)
- runtime toggles (`SLOWMO`)

Put in resources JSON:

- scenario input data
- expected assertion output
- flow-specific values used by tests

## 5) Recommended rollout for teams

1. Keep `local` as default for developer machines.
2. Use `stg` for CI smoke/regression checks.
3. Use `prod` only for safe read-only checks (if policy allows).

## 6) Common mistakes

- Missing `configs/.env.<ENV_NAME>` file while setting `ENV_NAME`
- Reusing wrong credentials across environments
- Putting test scenario data in env files instead of resources JSON
