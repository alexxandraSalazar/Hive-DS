# Hive-DS setup guide

First-time setup for the monorepo: GitHub, branches, `.npmrc`, tokens, and how releases work with changesets.

## What you are setting up

| Piece | Role |
| --- | --- |
| GitHub repo `alexxandraSalazar/Hive-DS` | Source of truth |
| Branch `main` | Stable branch; releases come from here |
| Feature branches | Where you work (`feat/...`, `fix/...`) |
| Changesets | Tracks version bumps + changelog for `@alexxandraSalazar/hive-ui` |
| GitHub Packages | Where the UI package is published |
| Project `.npmrc` (**committed**) | Tells npm/pnpm *where* `@alexxandraSalazar` packages live |
| User `~/.npmrc` (**never committed**) | Holds your private GitHub token |

---

## 1. Create the GitHub repository

1. Go to https://github.com/new
2. Owner: `alexxandraSalazar`
3. Name: `Hive-DS` (must match `.changeset/config.json`)
4. Visibility: **Private** is fine (matches `access: "restricted"` for GitHub Packages)
5. Do **not** add a README / `.gitignore` / license (this folder already has them)

Then connect and push from the repo root:

```bash
git branch -M main
git remote add origin https://github.com/alexxandraSalazar/Hive-DS.git
git add .
git commit -m "Initial Hive design system monorepo"
git push -u origin main
```

You currently have **no commits** and the local branch may still be `master`. Rename to `main` — changesets uses `"baseBranch": "main"`.

---

## 2. Branch model (how work flows)

```text
main          <- protected / always releasable
  |
  ├── feat/button-variants     <- your PR
  ├── fix/button-a11y
  └── chore/tokens
```

### Day-to-day

1. Update `main`: `git checkout main && git pull`
2. Create a branch: `git checkout -b feat/my-change`
3. Change code in `packages/ui` (and stories if needed)
4. Run `pnpm changeset` — pick `@alexxandraSalazar/hive-ui` and patch / minor / major
5. Commit code **and** the new file under `.changeset/`
6. Open a PR into `main`
7. Merge the PR
8. On `main`, version + publish (see below)

### What a changeset is

A small markdown file in `.changeset/` that says:

- which package changed (`hive-ui` only — apps are ignored)
- bump type: **patch** (bugfix), **minor** (new feature), **major** (breaking)
- a short summary for the changelog

Apps (`web`, `docs`) are listed in changesets `ignore`, so they are never published.

---

## 3. `.npmrc` — what goes where

### Commit this (already in the repo)

Project file: `.npmrc`

```ini
@alexxandraSalazar:registry=https://npm.pkg.github.com
```

**Yes — commit this.** It only says packages under `@alexxandraSalazar` come from GitHub Packages. It has **no secret**.

### Never commit this

Your **user** npmrc on Windows:

`%USERPROFILE%\.npmrc`

Add **only on your machine** (or as a CI secret):

```ini
//npm.pkg.github.com/:_authToken=ghp_YOUR_TOKEN_HERE
```

Or set it with pnpm (recommended):

```powershell
pnpm config set //npm.pkg.github.com/:_authToken ghp_YOUR_TOKEN_HERE --location user
```

That writes to your user config, not the project.

### Why not put the token in the project `.npmrc`?

- It would be committed and leaked
- pnpm refuses to expand env-based tokens from a committed project `.npmrc` for that reason

---

## 4. Create a GitHub token

1. Open https://github.com/settings/tokens
2. Prefer a **Fine-grained token** (or Classic if you already use those)

### Fine-grained token

- Resource owner: `alexxandraSalazar`
- Repository access: only `Hive-DS` (or all repos you need)
- Permissions:
  - **Contents**: Read (helps private-repo installs)
  - **Packages**: Read and Write

### Classic token (alternative)

Enable at least:

- `write:packages`
- `read:packages`
- `repo` (if the GitHub repo / package is private)

3. Generate and **copy the token once**
4. Put it in your **user** npmrc (step 3) — not in the repo

Treat the token like a password.

---

## 5. First publish (do this once)

From the repo root, after `main` exists on GitHub and your user token is set:

```powershell
pnpm install
pnpm build
pnpm --filter @alexxandraSalazar/hive-ui publish --access restricted --no-git-checks
```

Notes:

- `--access restricted` = private package on GitHub Packages (matches your changeset config)
- `--no-git-checks` is only for the awkward first publish if git state is messy; after that use the normal changeset flow
- Package scope must match your GitHub user/org: `@alexxandraSalazar/...` → user/org `alexxandraSalazar`

Confirm at:

https://github.com/alexxandraSalazar/Hive-DS/packages

---

## 6. Normal release flow (after the first publish)

### A. In your feature PR

```bash
pnpm changeset
```

Commit the generated `.changeset/*.md` file with your code.

### B. After merging to `main`

```bash
git checkout main
git pull
pnpm version-packages
git add .
git commit -m "Version packages"
git push
pnpm release
```

`pnpm release` runs `pnpm build && changeset publish`.

### Mental model

```text
code change  ->  changeset file  ->  merge to main
                                      |
                              version-packages (0.1.0 -> 0.1.1)
                                      |
                              publish to GitHub Packages
```

---

## 7. Installing the package in another project

In the **consumer** app:

1. Add the same **scope** line (safe to commit):

```ini
@alexxandraSalazar:registry=https://npm.pkg.github.com
```

2. Add the token to that machine’s **user** npmrc (do not commit)
3. Install:

```bash
pnpm add @alexxandraSalazar/hive-ui
```

---

## 8. Checklist — first time

- [ ] Create GitHub repo `alexxandraSalazar/Hive-DS`
- [ ] `git branch -M main`
- [ ] First commit + `git remote add origin ...` + `git push -u origin main`
- [ ] Confirm project `.npmrc` only has the scope line (committed)
- [ ] Create GitHub token with Packages write
- [ ] Save token with `pnpm config set //npm.pkg.github.com/:_authToken ... --location user`
- [ ] `pnpm build` then first `publish`
- [ ] Later changes: branch → code → `pnpm changeset` → PR → merge → `version-packages` → `pnpm release`

---

## Quick answers

| Question | Answer |
| --- | --- |
| Commit project `.npmrc`? | **Yes** (scope only) |
| Commit the token? | **Never** |
| Where does the token live? | User npmrc: `%USERPROFILE%\.npmrc` |
| Where do I get the token? | [GitHub → Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens) |
| Which branch for releases? | `main` |
| What gets published? | Only `@alexxandraSalazar/hive-ui` |
| Do apps publish? | No |
