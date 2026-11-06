# Hive Design System 🐝

Monorepo for the Hive design system: React components, a demo app, and Storybook docs.

**First-time GitHub / branches / token / publishing:** see [docs/SETUP.md](docs/SETUP.md).

## Structure

```text
Hive-DS/
├── apps/
│   ├── web/     # Next.js demo / consumer app
│   └── docs/    # Storybook + docs site
└── packages/
    └── ui/      # @alexxandraSalazar/hive-ui — publishable components
```


| Package       | Name                         | Purpose                               |
| ------------- | ---------------------------- | ------------------------------------- |
| `packages/ui` | `@alexxandraSalazar/hive-ui` | Design system components (published)  |
| `apps/web`    | `@alexxandraSalazar/web`     | Demo app that consumes the UI package |
| `apps/docs`   | `@alexxandraSalazar/docs`    | Storybook documentation               |




## Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io) 11+



## Getting started

```bash
pnpm install
pnpm build
```



### Demo app

```bash
pnpm dev
```

Opens the Next.js consumer at [http://localhost:3000](http://localhost:3000).

### Storybook

```bash
pnpm storybook
```

Opens Storybook at [http://localhost:6006](http://localhost:6006).

### Local component changes

`apps/web` and Storybook resolve `@alexxandraSalazar/hive-ui` from `packages/ui/src`, so edits to components (like Button) show after a browser refresh. You do not need `pnpm build` for local preview.

Run `pnpm build` before publishing.

## Using the UI package

```tsx
import { Button } from '@alexxandraSalazar/hive-ui';

export function Example() {
  return <Button variant="primary">Click me</Button>;
}
```

Inside this monorepo, apps depend on it with `workspace:*`. Outside the monorepo, install from GitHub Packages (see below).

## Scripts (repo root)


| Script           | Description                              |
| ---------------- | ---------------------------------------- |
| `pnpm build`     | Build the UI package                     |
| `pnpm build:all` | Build packages and apps                  |
| `pnpm dev`       | Start the web demo                       |
| `pnpm storybook` | Start Storybook                          |
| `pnpm typecheck` | Typecheck the UI package                 |
| `pnpm changeset` | Create a changeset for a release         |
| `pnpm release`   | Build + publish packages with changesets |




## Adding a component

1. Create the component in `packages/ui/src/`
2. Export it from `packages/ui/src/index.ts`
3. Add a story in `apps/docs/src/stories/`
4. Verify in Storybook / the demo app (refresh the browser)



## Versioning and publishing

This repo uses [changesets](https://github.com/changesets/changesets).

1. Make your changes
2. Run `pnpm changeset` and follow the prompts
3. Merge the version PR (or run `pnpm version-packages`)
4. Publish with `pnpm release`

`@alexxandraSalazar/hive-ui` publishes to GitHub Packages.

The repo `.npmrc` only maps the scope to GitHub Packages. Put your auth token in your **user** npmrc (never commit it):

```bash
pnpm config set //npm.pkg.github.com/:_authToken YOUR_GITHUB_TOKEN
```

Consumers need the same scope mapping:

```ini
@alexxandraSalazar:registry=https://npm.pkg.github.com
```



## What's next

- Design tokens (color, spacing, typography)
- More components beyond `Button`
- Shared theme / CSS variables
- Accessibility and visual regression checks in Storybook

