# GitHub Repository & CI/CD Setup Cheatsheet

A complete reference guide for configuring repository governance, GitHub Actions workflows, Nx task orchestration, and Git hooks for modern TypeScript/React applications.

---

## 1. Repository Settings & Governance

Navigate to `https://github.com/<owner>/<repo>/settings`:

### A. Pull Request Merging (Settings &rarr; General &rarr; Pull Requests)

- [x] **Automatically delete head branches**: Deletes remote feature branches immediately upon PR merge.
- [x] **Allow squash merging / Allow merge commits**: Configure commit message format (e.g., Default message vs PR title and description).
- [ ] _(Optional)_ **Always suggest updating pull request branches**: Prompts an "Update branch" button in the PR whenever the base branch advances.
- [ ] _(Optional)_ **Allow auto-merge**: Merges the PR automatically once all required approvals and status checks pass.

### B. Branch Protection Rules (Settings &rarr; Branches &rarr; Add branch ruleset / protection rule)

Protect primary branch (`master` or `main`):

- [x] **Require a pull request before merging**
- [x] **Require conversation resolution before merging**: Enforces that all review comments must be resolved before merge.
- [x] **Require status checks to pass before merging**:
  - [x] **Require branches to be up to date before merging**: Ensures PR code is tested against latest base branch HEAD.
  - **Explicitly search and add required status checks** (from `PR Validation` workflow):
    - `format`
    - `lint`
    - `build`
    - `test`

> [!TIP] > **Preventing the Initial False-Green "Mergeable" State:**  
> If you enable _Require status checks_ but do not explicitly search and select each check from the list, GitHub treats the required set as empty (`0 required checks`). This causes a brand-new PR to briefly show a green **"Squash and merge"** button until GitHub Actions runners report their `pending` status seconds later.
>
> Once jobs are explicitly added as **Required**, GitHub marks them as `Expected — Waiting for status to be reported` from the exact millisecond the PR is created, keeping the merge button **locked and disabled** until all checks pass.
>
> _Alternative:_ Open PRs as a **Draft** (`Create draft pull request`) to keep the merge button locked while actively iterating.

---

## 2. GitHub Actions Workflows

Place workflows in `.github/workflows/`:

### Key Action Best Practices:

> [!IMPORTANT] > **Single Source of Truth for pnpm:**  
> When `package.json` defines `"packageManager": "pnpm@<version>"`, **do NOT** specify `with: version:` in `pnpm/action-setup@v4`.
>
> ```yaml
> - uses: pnpm/action-setup@v4
>   # Automatically reads packageManager from package.json
> ```
>
> Providing both causes `Error: Multiple versions of pnpm specified` and fails the job immediately.

### Pipeline Architecture:

| Workflow          | File                                   | Trigger                                | Purpose                                                                     |
| :---------------- | :------------------------------------- | :------------------------------------- | :-------------------------------------------------------------------------- |
| **PR Validation** | `.github/workflows/pr-validation.yaml` | `pull_request` &rarr; `[main, master]` | Fast validation on PR: format, affected lint, affected build, affected test |
| **CI**            | `.github/workflows/ci.yaml`            | `push` &rarr; `[main, master]`         | Full branch validation post-merge: full lint, app builds, full test suite   |

---

## 3. Nx Task Runner Setup (Standalone / Package-Based)

### A. Dependencies & pnpm 12 Build Script Approval

In pnpm 12, postinstall build scripts are blocked by default (`ERR_PNPM_IGNORED_BUILDS`). Approve Nx in `pnpm-workspace.yaml`:

```yaml
allowBuilds:
  esbuild: true
  nx: true
```

### B. `nx.json` (Target Defaults & Caching)

```json
{
  "$schema": "./node_modules/nx/schemas/nx-schema.json",
  "defaultBase": "master",
  "namedInputs": {
    "default": ["{projectRoot}/**/*"],
    "production": ["default", "!{projectRoot}/eslint.config.js", "!{projectRoot}/.prettierrc.json"]
  },
  "targetDefaults": {
    "build": {
      "cache": true,
      "dependsOn": ["^build"],
      "inputs": ["production", "^production"],
      "outputs": ["{projectRoot}/dist"]
    },
    "lint": {
      "cache": true,
      "inputs": ["default"]
    },
    "format:check": {
      "cache": true,
      "inputs": ["default"]
    },
    "check:cycles": {
      "cache": true,
      "inputs": ["default"]
    }
  }
}
```

### C. `project.json` (Target Definitions)

> [!TIP] > **Prevent Infinite Recursion:**  
> Define underlying execution commands (`vite`, `eslint`, etc.) explicitly in `project.json` using `nx:run-commands`. This prevents root `package.json` scripts (`"lint": "nx run-many -t lint"`) from looping recursively.

```json
{
  "name": "project-management",
  "$schema": "node_modules/nx/schemas/project-schema.json",
  "projectType": "application",
  "sourceRoot": "src",
  "tags": ["type:app"],
  "targets": {
    "build": {
      "executor": "nx:run-commands",
      "options": { "command": "vite build" }
    },
    "serve": {
      "executor": "nx:run-commands",
      "options": { "command": "vite" }
    },
    "lint": {
      "executor": "nx:run-commands",
      "options": {
        "command": "eslint . --ext .js,.ts,.tsx --report-unused-disable-directives --max-warnings 0"
      }
    },
    "lint:fix": {
      "executor": "nx:run-commands",
      "options": {
        "command": "eslint . --ext .js,.ts,.tsx --report-unused-disable-directives --max-warnings 0 --fix"
      }
    },
    "test": {
      "executor": "nx:run-commands",
      "options": { "command": "echo No tests specified yet" },
      "configurations": {
        "ci": {}
      }
    }
  }
}
```

---

## 4. Git Hooks Optimization (Husky)

### Fast Pre-Commit (.husky/pre-commit)

> [!WARNING] > **Windows Named Pipe Stalls:**  
> In non-interactive Git subshells (such as VS Code Git GUI commits), the Nx daemon IPC can freeze on Windows Named Pipes. Always set `NX_DAEMON=false` inside Husky hooks.

```bash
export NX_DAEMON=false

pnpm nx affected -t lint:fix
pnpm format:uncommitted
```

### Pre-Push (.husky/pre-push)

```bash
export NX_DAEMON=false

pnpm check:cycles
```

---

## 5. Status Badges (README.md)

Add dynamic SVG status badges below `# Project Name`:

```markdown
[![CI](https://github.com/<owner>/<repo>/actions/workflows/ci.yaml/badge.svg?branch=master)](https://github.com/<owner>/<repo>/actions/workflows/ci.yaml)
[![PR Validation](https://github.com/<owner>/<repo>/actions/workflows/pr-validation.yaml/badge.svg)](https://github.com/<owner>/<repo>/actions/workflows/pr-validation.yaml)
```

---

## 6. Local Git DX (Auto-Prune)

Configure Git to automatically remove stale local tracking branches when remote branches are deleted on PR merge:

```bash
# Global (recommended for all projects)
git config --global fetch.prune true

# Or per repository
git config fetch.prune true
```
