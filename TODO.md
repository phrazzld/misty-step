# Todo

## CI/CD and Tooling Enforcement

- [x] **T001 · chore · P0: update all CI pnpm install commands to use --frozen-lockfile**

  - **Context:** Remediation Plan, cr-02 Secure CI Dependency Installation & Enforce Lockfile Integrity
  - **Action:**
    1. In `.github/workflows/ci.yml:56`, change `pnpm install --no-frozen-lockfile` to `pnpm install --frozen-lockfile`.
    2. In `.github/workflows/code-quality.yml:58`, change `pnpm install --no-frozen-lockfile` to `pnpm install --frozen-lockfile`.
    3. In `.github/workflows/code-quality.yml:96`, change `pnpm install --no-frozen-lockfile` to `pnpm install --frozen-lockfile`.
  - **Done‑when:**
    1. All `pnpm install` commands in CI workflow files (`.github/workflows/*.yml`) use `--frozen-lockfile`.
    2. CI builds fail if `pnpm-lock.yaml` is inconsistent with `package.json` or needs updates.
    3. The primary `pnpm install` step in `ci.yml` installs all necessary dependencies (including `devDependencies`) for subsequent testing, linting, and building stages.
    4. CI logs confirm dependencies are installed based on the frozen lockfile.
  - **Verification:**
    1. Manually modify `pnpm-lock.yaml` to be inconsistent with `package.json` and commit. Verify the CI job fails at the `pnpm install` step.
    2. After changes, confirm that CI jobs requiring `devDependencies` (e.g., tests, linting, build in `ci.yml`) complete successfully.
  - **Depends‑on:** none

- [x] **T002 · chore · P1: standardize pnpm version in package.json to 10.10.0**

  - **Context:** Remediation Plan, cr-03 Standardize pnpm Version Specification and Usage, Steps 1 & 2
  - **Action:**
    1. Verify `package.json` field `packageManager` is set to `"pnpm@10.10.0"`. If not, update it.
    2. In `package.json`, change the `engines.pnpm` field from its current value (e.g., `>=10`) to the exact version `"10.10.0"`.
  - **Done‑when:**
    1. `package.json` specifies `packageManager: "pnpm@10.10.0"`.
    2. `package.json` specifies `engines.pnpm: "10.10.0"`.
  - **Verification:**
    1. Inspect `package.json` to confirm the fields `packageManager` and `engines.pnpm` are correctly set.
  - **Depends‑on:** none

- [x] **T003 · chore · P1: update pnpm version to 10.10.0 in CI pnpm/action-setup**

  - **Context:** Remediation Plan, cr-03 Standardize pnpm Version Specification and Usage, Step 3
  - **Action:**
    1. In `.github/workflows/ci.yml`, update the `pnpm/action-setup@v3` step to use `version: '10.10.0'`.
    2. In `.github/workflows/code-quality.yml`, update the `pnpm/action-setup@v3` step to use `version: '10.10.0'`.
  - **Done‑when:**
    1. All CI workflows using `pnpm/action-setup` are configured with `version: '10.10.0'`.
    2. CI logs confirm that pnpm version `10.10.0` is being used by the setup action.
  - **Verification:**
    1. Review CI logs from `pnpm/action-setup` or add a temporary `pnpm --version` step to confirm `10.10.0` is used.
  - **Depends‑on:** none

- [x] **T004 · chore · P1: update CONTRIBUTING.md to specify pnpm version 10.10.0**

  - **Context:** Remediation Plan, cr-03 Standardize pnpm Version Specification and Usage, Step 4
  - **Action:**
    1. In `docs/CONTRIBUTING.md`, update the pnpm version requirement to specify `pnpm 10.10.0` precisely.
    2. Remove any references to "version 10 or higher" or similar loose specifications for pnpm.
  - **Done‑when:**
    1. `docs/CONTRIBUTING.md` explicitly states `pnpm 10.10.0` is required.
  - **Verification:**
    1. Manually review `docs/CONTRIBUTING.md` to ensure the pnpm version requirement is clear and accurate.
  - **Depends‑on:** none

- [x] **T005 · chore · P1: verify .npmrc has engine-strict=true**

  - **Context:** Remediation Plan, cr-01 Implement Strict Node.js & pnpm Version Enforcement, Step 1
  - **Action:**
    1. Verify that `.npmrc` file in the project root contains `engine-strict=true`.
    2. If the file doesn't exist or doesn't contain this setting, add it.
  - **Done‑when:**
    1. `.npmrc` file with `engine-strict=true` exists in the project root.
    2. `pnpm install` fails locally if the active Node.js or pnpm versions do not match the versions specified in `package.json#engines`.
  - **Verification:**
    1. After T002 and T006 are complete, switch to a non-matching Node.js version and run `pnpm install`. Verify it fails due to engine mismatch.
    2. Switch to a non-matching pnpm version and run `pnpm install`. Verify it fails due to engine mismatch.
  - **Depends‑on:** [T002, T006]

- [x] **T006 · chore · P1: set exact Node.js version in package.json#engines.node**

  - **Context:** Remediation Plan, cr-01 Implement Strict Node.js & pnpm Version Enforcement, Step 2
  - **Action:**
    1. Determine the exact desired Node.js version for the project (requires C001).
    2. Update `package.json#engines.node` to specify this exact Node.js version (e.g., `"22.15.0"`).
  - **Done‑when:**
    1. `package.json#engines.node` specifies the exact target Node.js version.
  - **Verification:**
    1. Inspect `package.json` to confirm `engines.node` is set to the chosen exact version.
  - **Depends‑on:** none

- [x] **T007 · feature · P1: add Node.js/pnpm version verification script to CI workflows**

  - **Context:** Remediation Plan, cr-01 Implement Strict Node.js & pnpm Version Enforcement, Step 3
  - **Action:**
    1. In `.github/workflows/ci.yml` and `.github/workflows/code-quality.yml`, add a new step after Node.js and pnpm setup.
    2. This step must execute a script (e.g., the bash script from the plan) that compares `node -v` against `package.json#engines.node` and `pnpm -v` against `package.json#engines.pnpm`.
    3. The script must cause the CI job to fail if a version mismatch is detected.
  - **Done‑when:**
    1. CI jobs include explicit steps that verify Node.js and pnpm versions against `package.json#engines`.
    2. CI jobs fail if either Node.js or pnpm version mismatches the `package.json#engines` specification.
    3. CI logs clearly show the current and expected versions during the check.
  - **Verification:**
    1. Temporarily modify a CI workflow to set up an incorrect Node.js or pnpm version. Trigger the workflow and verify it fails at the new version check step with an appropriate error message.
  - **Depends‑on:** [T002, T003, T006]

- [ ] **T008 · feature · P1: implement pre-commit hook for local Node.js/pnpm version check**

  - **Context:** Remediation Plan, cr-01 Implement Strict Node.js & pnpm Version Enforcement, Step 4
  - **Action:**
    1. Set up or confirm pre-commit hook tooling (e.g., Husky and `lint-staged`, per C002).
    2. Implement a script that checks local `node -v` against `package.json#engines.node` and `pnpm -v` against `package.json#engines.pnpm`.
    3. Configure the pre-commit hook to run this script, failing the commit if versions are incorrect.
  - **Done‑when:**
    1. Pre-commit hook is configured and runs automatically before commits.
    2. Commits are prevented if the local Node.js or pnpm versions do not match `package.json#engines`.
  - **Verification:**
    1. Locally switch to a Node.js version different from `package.json#engines.node`. Attempt to commit a change and verify the pre-commit hook blocks the commit.
    2. Locally switch to a pnpm version different from `package.json#engines.pnpm`. Attempt to commit a change and verify the pre-commit hook blocks the commit.
  - **Depends‑on:** [T002, T006]

- [ ] **T009 · chore · P2: align .nvmrc with package.json#engines.node**
  - **Context:** Remediation Plan, cr-01 Implement Strict Node.js & pnpm Version Enforcement (Done-When for `.nvmrc`)
  - **Action:**
    1. If an `.nvmrc` file is used, update its content to match the exact Node.js version specified in `package.json#engines.node`.
    2. If `.nvmrc` is not used but is desired for local development consistency, create it with the Node.js version from `package.json#engines.node`.
  - **Done‑when:**
    1. `.nvmrc` (if used or newly created) is consistent with `package.json#engines.node`.
  - **Verification:**
    1. If `.nvmrc` is used, run `nvm use` (or equivalent command for other version managers reading `.nvmrc`) and then `node -v` to confirm the version matches `package.json#engines.node`.
    2. Inspect the content of `.nvmrc` and `package.json#engines.node`.
  - **Depends‑on:** [T006]
