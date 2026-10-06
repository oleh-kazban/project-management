# React + TypeScript Project Setup Guide

This guide records the steps used to turn a minimal Vite/React starter into a
more maintainable project foundation. It is written to be reusable: adapt the
version numbers, build tool, scripts, and import aliases to the project where
you apply it.

The setup covers pnpm, TSX source files, ESLint, strict import ordering,
Prettier, Husky pre-commit automation, and Madge circular-dependency checks on
pre-push. These tools improve consistency; they do not replace
application-specific testing, security review, CI, or TypeScript type-checking.

## 1. Check the starting project

Before changing files:

1. Read `package.json` and the current lockfile.
2. Identify the framework entry point, JSX files, HTML script entry, and
   bundler configuration.
3. Check existing lint/format configuration and scripts.
4. Record the current build and lint results so that regressions are easy to
   spot.
5. Check that the project is in a Git repository before installing Husky.

Do not keep multiple package-manager lockfiles. A repository should use one
package manager consistently.

## 2. Standardize on pnpm

Install pnpm using the team's preferred Node.js/Corepack workflow, then declare
the expected package manager version in `package.json`:

```json
{
  "packageManager": "pnpm@10.9.0"
}
```

Use the version selected by the team rather than copying this example blindly.
Install dependencies with pnpm, review the resulting manifest changes, and
commit `pnpm-lock.yaml`. Remove the previous manager's lockfile (for example,
`package-lock.json` or `yarn.lock`) after confirming the new lockfile contains
the project's dependency graph.

Common commands:

```sh
pnpm install
pnpm add <package>
pnpm add --save-dev <package>
```

For a clean checkout, use `pnpm install --frozen-lockfile` in CI so that the
lockfile is validated rather than silently rewritten.

## 3. Move React source files to TSX

Rename React components from `.jsx` to `.tsx` (and `.js` to `.ts` where a file
contains no JSX). Then update references to the renamed files in imports and
HTML entry points. For a Vite app, the HTML module script should point to the
renamed entry file, for example:

```html
<script type="module" src="/src/main.tsx"></script>
```

Update file globs used by tools such as Tailwind so that they include `.tsx`
and no longer depend on `.jsx`, for example:

```js
content: ['./index.html', './src/**/*.{js,ts,tsx}'],
```

Add TypeScript, React type packages, and a TypeScript-capable ESLint parser.
Check each component's props and event types as TypeScript is introduced.

**Type-checking note:** Vite transpiles TypeScript/TSX, but a successful Vite
build does not by itself guarantee TypeScript type correctness. To enable
project-wide checking, add an appropriate `tsconfig.json` and a script such as
`"typecheck": "tsc --noEmit"`, then run it in CI. Use compiler options suited
to the project rather than copying a generic config without review.

## 4. Add ESLint with flat config

Install ESLint and the plugins needed by the project. A React/TSX setup
typically needs:

- `eslint` and `@eslint/js` for the linter and core recommended rules.
- `@typescript-eslint/parser` to parse TypeScript and TSX.
- `eslint-plugin-react` and `eslint-plugin-react-hooks` for React rules.
- `eslint-plugin-react-refresh` when using Vite's React Fast Refresh.
- `eslint-plugin-import` for the configurable `import/order` rule.
- `globals` for browser global definitions.
- `eslint-config-prettier` to turn off formatting rules that conflict with
  Prettier.

Use the ESLint flat-config file `eslint.config.js` (ES modules are enabled by
`"type": "module"` in this project). A representative configuration is:

```js
import { fixupPluginRules } from '@eslint/compat';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

const reactPlugin = fixupPluginRules(react);
const importPluginCompat = fixupPluginRules(importPlugin);

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  {
    files: ['**/*.{js,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: globals.browser,
    },
    plugins: {
      import: importPluginCompat,
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      'import/internal-regex': '^@/',
      react: { version: 'detect' },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.flat.recommended.rules,
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            ['internal', 'parent', 'sibling', 'index'],
          ],
          pathGroups: [
            {
              pattern: 'react{,-dom}{,/**}',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          named: true,
        },
      ],
    },
  },
  eslintConfigPrettier,
];
```

The React and import plugins' rules are wrapped with `fixupPluginRules` here to
adapt legacy rule APIs. Check all plugin peer dependency ranges when selecting
versions: the versions used for this setup declare peer support through ESLint
9, so pairing them with ESLint 10 can produce peer-dependency warnings. Prefer
plugin releases that explicitly support the chosen ESLint version, or select a
compatible ESLint major. The compatibility wrapper helps with legacy rule APIs;
it does not change a package's declared peer range.

### Import group policy

The `import/order` rule above enforces these groups in order, with a blank line
between each non-empty group:

1. React and React subpath imports, such as `react` and `react-dom/client`.
2. Other external packages, including scoped packages.
3. Application imports: aliases beginning with `@/` and relative paths.

If an app uses a different alias, update the `import/internal-regex` setting so
those imports are recognized as application imports. Run ESLint with `--fix`
to arrange imports in the configured order, then review the diff. The React
path group covers `react`, `react-dom`, and their subpaths; adapt the pattern
if the app considers additional React ecosystem packages part of that first
group.

## 5. Add ESLint scripts

Provide a check-only script and a separate autofix script. For this project,
the scripts are:

```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.ts,.tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext .js,.ts,.tsx --report-unused-disable-directives --max-warnings 0 --fix"
  }
}
```

If the team uses the names `lint:all` and `lint:all:fix`, those can be used
instead; keep the hook and documentation in sync with the actual script names.
The key difference is that the fix script includes `--fix`, while the check
script should not modify files.

## 6. Add Prettier

Install Prettier and add a project configuration, for example:

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100
}
```

Expose format and check commands in `package.json`:

```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

Add generated and dependency directories to `.prettierignore`, such as
`node_modules` and `dist`. Ignore the active lockfile too if the team does not
want Prettier to rewrite it. Keep `eslint-config-prettier` last in the ESLint
configuration so formatting rules do not compete with Prettier.

## 7. Add Husky pre-commit automation

Initialize a Git repository first: Husky needs `.git` to install its hooks.
Then install Husky and configure its prepare script:

```sh
pnpm add --save-dev husky
pnpm pkg set scripts.prepare="husky"
pnpm run prepare
```

Create `.husky/pre-commit` with the commands that should run before commits:

```sh
pnpm lint:fix
pnpm format
```

Commands run in order; a failure stops the hook and prevents the commit. Ensure
the hook file is tracked and that a clean clone installs dependencies and
initializes Husky as expected.

**Important staged-file behavior:** these commands operate across the project,
not only on staged files. They may modify unstaged files, and Git does not
automatically add those modifications to the commit. Review the changes and
stage them again before committing. If the repository needs faster checks or
automatic staging of only changed files, use a staged-file workflow such as
`lint-staged` and configure ESLint/Prettier to target staged paths.

## 8. Add a pre-push circular-dependency check

Circular dependency analysis is useful before pushing changes but can be
unnecessary work on every commit. Madge can check the TypeScript/TSX source
graph, so install it as a development dependency and add a script:

```sh
pnpm add --save-dev madge
pnpm pkg set 'scripts.check:cycles=madge --circular --extensions ts,tsx src'
```

Create `.husky/pre-push`:

```sh
pnpm check:cycles
```

The check should exit unsuccessfully when Madge detects circular dependencies,
blocking the push. Keep the command scoped to source files rather than
generated output or dependencies. If the project uses TypeScript path aliases,
configure Madge's resolver to understand the alias and verify that the reported
graph includes those imports. Keep a CI check as well if cycle detection must
run when local Git hooks are bypassed.

## 9. Document the project

Keep the main `README.md` focused on getting started, common scripts, project
structure, and contribution basics. A separate setup guide like this one is
useful when the same tooling migration needs to be repeated across multiple
repositories.

Update documentation whenever script names, hook behavior, or tool choices
change. Avoid claiming that a starter is production-ready solely because lint,
format, and build tooling are present.

## 10. Validate the setup

After applying the changes:

1. Install from the lockfile: `pnpm install --frozen-lockfile`.
2. Run the check-only linter: `pnpm lint`.
3. Run the linter fixer: `pnpm lint:fix`, then review its diff.
4. Format files: `pnpm format`.
5. Verify formatting: `pnpm format:check`.
6. Run the production build: `pnpm build`.
7. Run `pnpm typecheck` too if TypeScript type-checking has been configured.
8. Test the pre-commit hook in a Git checkout with a representative staged
   change; verify failure handling and review any modified files.
9. Run `pnpm check:cycles` and test the pre-push hook from a Git checkout.

Commit both the package manifest and the matching lockfile after dependency
changes. Avoid committing generated output, dependency directories, or secrets.

## Current project reference

In this project, the relevant files are:

- `package.json` and `pnpm-lock.yaml` — dependencies and pnpm scripts.
- `eslint.config.js` — ESLint flat configuration and import ordering.
- `.prettierrc.json` and `.prettierignore` — formatting rules and exclusions.
- `.husky/pre-commit` — lint and format commands run before commits.
- `.husky/pre-push` — circular dependency check before pushes.
- `madge` via `pnpm check:cycles` — TypeScript/TSX dependency graph check.
- `src/main.tsx` and `src/App.tsx` — TSX entry point and root component.
- `index.html` and `tailwind.config.js` — Vite entry reference and source globs.
- `README.md` — project-specific onboarding instructions.
